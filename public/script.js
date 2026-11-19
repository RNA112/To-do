/**
 * TASKFLOW — LOGICA PRINCIPAL (JAVASCRIPT VANILLA ES6+ / FIREBASE FIRESTORE)
 * Totalmente integrado ao Firebase Firestore com sincronização em tempo real (onSnapshot)
 * Livre de localStorage e dados hardcoded.
 */

import {
  db,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "./firebase-config.js";

(function () {
  'use strict';

  // 1. ESTADO GLOBAL DA APLICAÇÃO
  let state = {
    tasks: [],
    loading: true,
    error: null,
    currentView: 'dashboard', // 'dashboard', 'completed', 'editor'
    currentFilter: 'all',     // 'all', 'today', 'upcoming', 'completed'
    searchQuery: '',
    currentSort: 'dueDate',   // 'dueDate', 'priority', 'title'
    selectedTaskId: null,
    selectedProjectFilter: null,
    editingTask: null,
    deletingTaskId: null,
    tempModalSubtasks: []
  };

  let unsubscribeTasks = null;

  // 2. ELEMENTOS DO DOM (CACHE)
  const DOM = {
    // Views
    viewDashboard: document.getElementById('viewDashboard'),
    viewCompleted: document.getElementById('viewCompleted'),
    viewEditor: document.getElementById('viewEditor'),
    navLinks: document.querySelectorAll('.sidebar-nav a, .project-links a'),
    
    // Top Bar & Search
    topSearchInput: document.getElementById('topSearchInput'),
    btnHeaderNewTask: document.getElementById('btnHeaderNewTask'),
    btnQuickAdd: document.getElementById('btnQuickAdd'),
    btnDashboardNewTask: document.getElementById('btnDashboardNewTask'),
    btnCompletedNewTask: document.getElementById('btnCompletedNewTask'),
    btnPlanTomorrow: document.getElementById('btnPlanTomorrow'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileAddBtn: document.getElementById('mobileAddBtn'),
    sidebar: document.getElementById('sidebar'),
    sidebarBackdrop: document.getElementById('sidebarBackdrop'),

    // Dashboard KPIs
    kpiTotalNum: document.getElementById('kpiTotalNum'),
    kpiCompletedNum: document.getElementById('kpiCompletedNum'),
    kpiPendingNum: document.getElementById('kpiPendingNum'),
    kpiOverdueNum: document.getElementById('kpiOverdueNum'),
    kpiCompletionPct: document.getElementById('kpiCompletionPct'),
    greetingPendingCount: document.getElementById('greetingPendingCount'),
    greetingPriorityBadge: document.getElementById('greetingPriorityBadge'),
    productivityRadialFill: document.getElementById('productivityRadialFill'),
    radialPercentageText: document.getElementById('radialPercentageText'),
    prodGoalsDoneText: document.getElementById('prodGoalsDoneText'),

    // Nav Counters
    countMyTasks: document.getElementById('countMyTasks'),
    countToday: document.getElementById('countToday'),
    countUpcoming: document.getElementById('countUpcoming'),

    // Task List Filters & Stream
    dashboardTaskStream: document.getElementById('dashboardTaskStream'),
    filterTabButtons: document.querySelectorAll('.filter-tab-btn'),
    taskListSearchInput: document.getElementById('taskListSearchInput'),
    badgeAllCount: document.getElementById('badgeAllCount'),
    badgeTodayCount: document.getElementById('badgeTodayCount'),
    badgeUpcomingCount: document.getElementById('badgeUpcomingCount'),
    badgeCompletedCount: document.getElementById('badgeCompletedCount'),
    sortDropdownBtn: document.getElementById('sortDropdownBtn'),
    sortCurrentLabel: document.getElementById('sortCurrentLabel'),

    // Bottom Quick Bar
    bottomQuickBar: document.getElementById('bottomQuickBar'),
    quickBarInput: document.getElementById('quickBarInput'),
    btnQuickBarAdd: document.getElementById('btnQuickBarAdd'),

    // Completed View
    completedItemsStream: document.getElementById('completedItemsStream'),
    completedEarlierCount: document.getElementById('completedEarlierCount'),
    completedTotalWeekText: document.getElementById('completedTotalWeekText'),
    btnClearArchive: document.getElementById('btnClearArchive'),
    btnExportCSV: document.getElementById('btnExportCSV'),

    // Editor View
    editorGroupHigh: document.getElementById('editorGroupHigh'),
    editorGroupInProgress: document.getElementById('editorGroupInProgress'),
    groupHighCount: document.getElementById('groupHighCount'),
    groupInProgressCount: document.getElementById('groupInProgressCount'),
    editorMiniInProgressNum: document.getElementById('editorMiniInProgressNum'),
    editorMiniCriticalNum: document.getElementById('editorMiniCriticalNum'),
    editorMiniCompletedNum: document.getElementById('editorMiniCompletedNum'),
    editorProjectTitle: document.getElementById('editorProjectTitle'),
    editorCrumbProject: document.getElementById('editorCrumbProject'),

    // Drawer Elements
    editorDrawer: document.getElementById('editorDrawer'),
    drawerTitleInput: document.getElementById('drawerTitleInput'),
    drawerTaskKeyTag: document.getElementById('drawerTaskKeyTag'),
    drawerStatusSelect: document.getElementById('drawerStatusSelect'),
    drawerPrioritySelect: document.getElementById('drawerPrioritySelect'),
    drawerFieldStatus: document.getElementById('drawerFieldStatus'),
    drawerFieldPriority: document.getElementById('drawerFieldPriority'),
    drawerFieldAssignee: document.getElementById('drawerFieldAssignee'),
    drawerFieldDueDate: document.getElementById('drawerFieldDueDate'),
    drawerFieldProject: document.getElementById('drawerFieldProject'),
    drawerDescTextarea: document.getElementById('drawerDescTextarea'),
    drawerDueBannerText: document.getElementById('drawerDueBannerText'),
    drawerBtnComplete: document.getElementById('drawerBtnComplete'),
    drawerCompleteBtnText: document.getElementById('drawerCompleteBtnText'),
    drawerBtnSave: document.getElementById('drawerBtnSave'),
    drawerBtnDelete: document.getElementById('drawerBtnDelete'),
    btnCloseDrawer: document.getElementById('btnCloseDrawer'),
    btnCopyTaskKey: document.getElementById('btnCopyTaskKey'),

    // Modal Elements
    taskModalOverlay: document.getElementById('taskModalOverlay'),
    modalTitleInput: document.getElementById('modalTitleInput'),
    modalDescInput: document.getElementById('modalDescInput'),
    modalDueDateText: document.getElementById('modalDueDateText'),
    modalDueTimeText: document.getElementById('modalDueTimeText'),
    modalPriorityGroup: document.getElementById('modalPriorityGroup'),
    modalProjectSelect: document.getElementById('modalProjectSelect'),
    modalNotificationToggle: document.getElementById('modalNotificationToggle'),
    modalSubtasksList: document.getElementById('modalSubtasksList'),
    modalSubtasksCounter: document.getElementById('modalSubtasksCounter'),
    btnModalAddSubtask: document.getElementById('btnModalAddSubtask'),
    btnModalCancel: document.getElementById('btnModalCancel'),
    btnModalSubmit: document.getElementById('btnModalSubmit'),
    btnModalSubmitLabel: document.getElementById('btnModalSubmitLabel'),
    modalLabelsContainer: document.getElementById('modalLabelsContainer'),
    btnModalAddTag: document.getElementById('btnModalAddTag'),

    // Delete Confirm Modal
    confirmDeleteModal: document.getElementById('confirmDeleteModal'),
    btnCancelDelete: document.getElementById('btnCancelDelete'),
    btnConfirmDelete: document.getElementById('btnConfirmDelete'),

    // Toast Container
    toastContainer: document.getElementById('toastContainer')
  };

  // 3. TOAST NOTIFICATION UTILITY
  function showToast(message, type = 'info') {
    if (!DOM.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6063ee'}" stroke-width="2.5">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>${escapeHTML(message)}</span>
    `;
    DOM.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // 4. SINCRONIZAÇÃO EM TEMPO REAL COM ONSNAPSHOT
  function initFirestoreListener() {
    state.loading = true;
    state.error = null;
    renderAll();

    const tasksRef = collection(db, "tasks");
    const tasksQuery = query(tasksRef, orderBy("createdAt", "desc"));

    try {
      unsubscribeTasks = onSnapshot(
        tasksQuery,
        (snapshot) => {
          state.loading = false;
          state.error = null;

          state.tasks = snapshot.docs.map((document) => {
            const data = document.data();
            return {
              id: document.id,
              ...data
            };
          });

          // Se a tarefa selecionada não existir mais, seleciona a primeira disponível
          if (state.tasks.length > 0) {
            if (!state.selectedTaskId || !state.tasks.some(t => t.id === state.selectedTaskId)) {
              state.selectedTaskId = state.tasks[0].id;
            }
          } else {
            state.selectedTaskId = null;
          }

          renderAll();
        },
        (error) => {
          console.error("Erro ao sincronizar tarefas com o Firestore:", error);
          state.loading = false;
          state.error = error;
          showToast("Não foi possível sincronizar as tarefas com o servidor.", "error");
          renderAll();
        }
      );
    } catch (err) {
      console.error("Erro ao inicializar listener Firestore:", err);
      state.loading = false;
      state.error = err;
      showToast("Falha na inicialização do serviço Firestore.", "error");
      renderAll();
    }
  }

  // 5. RENDERIZAÇÃO DAS VIEWS & NAVEGAÇÃO
  function switchView(viewName) {
    state.currentView = viewName;

    // Atualiza classes ativas nos painéis
    if (DOM.viewDashboard) DOM.viewDashboard.classList.toggle('active', viewName === 'dashboard');
    if (DOM.viewCompleted) DOM.viewCompleted.classList.toggle('active', viewName === 'completed');
    if (DOM.viewEditor) DOM.viewEditor.classList.toggle('active', viewName === 'editor');

    // Atualiza seleção na Sidebar
    DOM.navLinks.forEach(link => {
      const navTarget = link.getAttribute('data-nav');
      if (viewName === 'editor' && navTarget === 'project') {
        const prj = link.getAttribute('data-project');
        link.classList.toggle('active', prj === state.selectedProjectFilter);
      } else {
        link.classList.toggle('active', navTarget === viewName);
      }
    });

    // Fecha menu mobile se aberto
    if (DOM.sidebar) DOM.sidebar.classList.remove('open');
    if (DOM.sidebarBackdrop) DOM.sidebarBackdrop.classList.remove('open');

    // Renderiza dados correspondentes
    renderAll();
  }

  // 6. CÁLCULO DINÂMICO DE MÉTRICAS & INDICADORES
  function updateMetrics() {
    const total = state.tasks.length;
    const completedTasks = state.tasks.filter(t => t.completed);
    const completedCount = completedTasks.length;
    const pendingTasks = state.tasks.filter(t => !t.completed);
    const pendingCount = pendingTasks.length;
    
    // Tarefas de hoje
    const todayTasks = state.tasks.filter(t => (t.timeSlot === 'today' || (t.dueDate && String(t.dueDate).toLowerCase().includes('today'))) && !t.completed);
    const todayCount = todayTasks.length;
    
    // Próximas (upcoming)
    const upcomingTasks = state.tasks.filter(t => (t.timeSlot === 'upcoming' || (!t.completed && t.timeSlot !== 'today' && (!t.dueDate || !String(t.dueDate).toLowerCase().includes('today')))) && !t.completed);
    const upcomingCount = upcomingTasks.length;

    // Alta prioridade pendentes
    const highPriorityTasks = pendingTasks.filter(t => t.priority === 'high' || t.priority === 'urgent');

    // Overdue
    const overdueCount = state.tasks.filter(t => t.priority === 'urgent' && !t.completed).length;

    // Porcentagem de conclusão
    const completionPercentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

    // Atualiza KPIs do Dashboard
    if (DOM.kpiTotalNum) DOM.kpiTotalNum.textContent = total;
    if (DOM.kpiCompletedNum) DOM.kpiCompletedNum.textContent = completedCount;
    if (DOM.kpiPendingNum) DOM.kpiPendingNum.textContent = pendingCount;
    if (DOM.kpiOverdueNum) DOM.kpiOverdueNum.textContent = overdueCount;
    if (DOM.kpiCompletionPct) DOM.kpiCompletionPct.textContent = `${completionPercentage}%`;

    // Welcome greeting
    if (DOM.greetingPendingCount) {
      DOM.greetingPendingCount.textContent = `${todayCount} tasks scheduled`;
    }
    if (DOM.greetingPriorityBadge) {
      DOM.greetingPriorityBadge.textContent = `${highPriorityTasks.length} high priority`;
    }

    // Sidebar Counters
    if (DOM.countMyTasks) DOM.countMyTasks.textContent = pendingCount;
    if (DOM.countToday) DOM.countToday.textContent = todayCount;
    if (DOM.countUpcoming) DOM.countUpcoming.textContent = upcomingCount;

    // Filter Badges
    if (DOM.badgeAllCount) DOM.badgeAllCount.textContent = total;
    if (DOM.badgeTodayCount) DOM.badgeTodayCount.textContent = todayCount;
    if (DOM.badgeUpcomingCount) DOM.badgeUpcomingCount.textContent = upcomingCount;
    if (DOM.badgeCompletedCount) DOM.badgeCompletedCount.textContent = completedCount;

    // Radial Progress (Daily Productivity Widget)
    if (DOM.radialPercentageText) {
      DOM.radialPercentageText.textContent = `${completionPercentage}%`;
    }
    if (DOM.productivityRadialFill) {
      const perimeter = 213.6;
      const offset = perimeter - (perimeter * (completionPercentage / 100));
      DOM.productivityRadialFill.style.strokeDashoffset = offset;
    }
    if (DOM.prodGoalsDoneText) {
      DOM.prodGoalsDoneText.textContent = `${completedCount} of ${total} goals done`;
    }

    // Completed View Subtitle and metrics
    if (DOM.completedTotalWeekText) {
      DOM.completedTotalWeekText.textContent = `${completedCount} tasks`;
    }
    if (DOM.completedEarlierCount) {
      DOM.completedEarlierCount.textContent = `${completedCount} tasks`;
    }

    // Mini KPIs no Editor
    if (DOM.editorMiniInProgressNum) {
      const inProg = state.tasks.filter(t => t.status === 'in_progress' && !t.completed).length;
      DOM.editorMiniInProgressNum.textContent = inProg;
    }
    if (DOM.editorMiniCriticalNum) {
      DOM.editorMiniCriticalNum.textContent = highPriorityTasks.length;
    }
    if (DOM.editorMiniCompletedNum) {
      DOM.editorMiniCompletedNum.textContent = completedCount;
    }
  }

  // 7. FILTRAGEM E ORDENAÇÃO DE TAREFAS
  function getFilteredTasks() {
    let result = [...state.tasks];

    // Filtro por View/Status
    if (state.currentFilter === 'today') {
      result = result.filter(t => t.timeSlot === 'today' || (t.dueDate && String(t.dueDate).toLowerCase().includes('today')));
    } else if (state.currentFilter === 'upcoming') {
      result = result.filter(t => t.timeSlot === 'upcoming' || (!t.completed && t.timeSlot !== 'today' && (!t.dueDate || !String(t.dueDate).toLowerCase().includes('today'))));
    } else if (state.currentFilter === 'completed') {
      result = result.filter(t => t.completed);
    }

    // Filtro de Busca (por título, descrição, projeto ou ID)
    const q = state.searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(t => 
        (t.title && t.title.toLowerCase().includes(q)) ||
        (t.description && t.description.toLowerCase().includes(q)) ||
        (t.project && t.project.toLowerCase().includes(q)) ||
        (t.id && t.id.toLowerCase().includes(q))
      );
    }

    // Ordenação
    if (state.currentSort === 'priority') {
      const pWeights = { urgent: 4, high: 3, medium: 2, low: 1 };
      result.sort((a, b) => (pWeights[b.priority] || 0) - (pWeights[a.priority] || 0));
    } else if (state.currentSort === 'title') {
      result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else {
      // Due Date (padrão)
      result.sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        return (a.dueDateRaw || '').localeCompare(b.dueDateRaw || '');
      });
    }

    return result;
  }

  // 8. RENDERIZAÇÃO DO DASHBOARD
  function renderDashboardTasks() {
    if (!DOM.dashboardTaskStream) return;

    // Estado de Carregamento
    if (state.loading) {
      DOM.dashboardTaskStream.innerHTML = `
        <div class="state-feedback-card">
          <div class="loading-spinner"></div>
          <p class="state-feedback-title">Sincronizando tarefas...</p>
          <p class="state-feedback-desc">Carregando seus registros diretamente do Firestore.</p>
        </div>
      `;
      return;
    }

    // Estado de Erro
    if (state.error) {
      DOM.dashboardTaskStream.innerHTML = `
        <div class="state-feedback-card error">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p class="state-feedback-title" style="color: var(--color-error);">Erro ao carregar dados</p>
          <p class="state-feedback-desc">${escapeHTML(state.error.message || 'Verifique sua conexão ou permissões de acesso ao Firestore.')}</p>
        </div>
      `;
      return;
    }

    const tasks = getFilteredTasks();

    // Estado de Lista Vazia
    if (tasks.length === 0) {
      DOM.dashboardTaskStream.innerHTML = `
        <div class="state-feedback-card">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <p class="state-feedback-title">Nenhuma tarefa encontrada</p>
          <p class="state-feedback-desc">Crie uma nova tarefa pelo botão superior ou altere os filtros aplicados.</p>
        </div>
      `;
      return;
    }

    DOM.dashboardTaskStream.innerHTML = tasks.map(task => {
      const priorityClass = `priority-${task.priority || 'medium'}`;
      const priorityLabel = (task.priority || 'Medium').toUpperCase();
      const dotClass = task.project === 'Marketing Launch' ? 'dot-marketing' :
                       task.project === 'Engineering Sprint' ? 'dot-engineering' :
                       task.project === 'Personal Goals' ? 'dot-personal' : 'dot-roadmap';

      const doneSubtasks = (task.subtasks || []).filter(s => s.done).length;
      const totalSubtasks = (task.subtasks || []).length;
      const subtaskMeta = totalSubtasks > 0 ? `
        <span class="task-meta-text">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          <span>${doneSubtasks}/${totalSubtasks} subtasks</span>
        </span>
      ` : '';

      return `
        <div class="task-item-card" data-task-id="${task.id}">
          <div class="task-checkbox-wrap">
            <button class="task-checkbox-custom ${task.completed ? 'checked' : ''}" data-action="toggle-complete" data-id="${task.id}" aria-label="Marcar como concluída">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
          </div>

          <div class="task-card-content" data-action="open-detail" data-id="${task.id}">
            <div class="task-card-header">
              <h3 class="task-card-title ${task.completed ? 'completed' : ''}">${escapeHTML(task.title)}</h3>
              <span class="badge-priority-chip ${priorityClass}">
                <span class="priority-dot"></span>
                <span>${priorityLabel}</span>
              </span>
            </div>

            ${task.description ? `<p class="task-card-desc">${escapeHTML(task.description)}</p>` : ''}

            <div class="task-card-meta-row">
              <div class="task-meta-left">
                <span class="badge-project-chip">
                  <span class="project-dot ${dotClass}"></span>
                  <span>${escapeHTML(task.project || 'General')}</span>
                </span>
                <span class="task-meta-text">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <span>${escapeHTML(task.dueDate || 'No due date')}</span>
                </span>
                ${subtaskMeta}
              </div>

              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" alt="Assignee" class="task-card-avatar" title="${escapeHTML(task.assignee || 'Alex Morgan')}">
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 9. RENDERIZAÇÃO DA VIEW COMPLETED
  function renderCompletedTasks() {
    if (!DOM.completedItemsStream) return;

    if (state.loading) {
      DOM.completedItemsStream.innerHTML = `
        <div class="state-feedback-card">
          <div class="loading-spinner"></div>
          <p class="state-feedback-title">Carregando arquivo...</p>
        </div>
      `;
      return;
    }

    if (state.error) {
      DOM.completedItemsStream.innerHTML = `
        <div class="state-feedback-card error">
          <p class="state-feedback-title" style="color: var(--color-error);">Erro ao carregar dados</p>
        </div>
      `;
      return;
    }

    const completedList = state.tasks.filter(t => t.completed);

    if (completedList.length === 0) {
      DOM.completedItemsStream.innerHTML = `
        <div class="state-feedback-card">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <p class="state-feedback-title">Nenhuma tarefa concluída</p>
          <p class="state-feedback-desc">Marque uma tarefa como concluída no painel para visualizá-la no histórico.</p>
        </div>
      `;
      return;
    }

    DOM.completedItemsStream.innerHTML = completedList.map(task => {
      return `
        <div class="completed-row-item" data-task-id="${task.id}">
          <div class="cri-left">
            <button class="cri-check-icon" data-action="toggle-complete" data-id="${task.id}" title="Clique para reabrir a tarefa" aria-label="Reabrir tarefa">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
            <div class="cri-text-col">
              <span class="cri-title">${escapeHTML(task.title)}</span>
              <div class="cri-meta-row">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>${escapeHTML(task.completedAt || 'Recently')}</span>
                <span>•</span>
                <span>${escapeHTML(task.project || 'General')}</span>
              </div>
            </div>
          </div>
          <button class="icon-btn-xs" data-action="open-detail" data-id="${task.id}" title="Visualizar detalhes">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      `;
    }).join('');
  }

  // 10. RENDERIZAÇÃO DA VIEW EDITOR / PROJETO
  function renderEditorTasks() {
    if (!DOM.editorGroupHigh || !DOM.editorGroupInProgress) return;

    if (state.loading) {
      DOM.editorGroupHigh.innerHTML = '<div class="state-feedback-card"><div class="loading-spinner"></div></div>';
      DOM.editorGroupInProgress.innerHTML = '';
      return;
    }

    let projectTasks = state.tasks;
    if (state.selectedProjectFilter) {
      projectTasks = state.tasks.filter(t => t.project === state.selectedProjectFilter);
      if (DOM.editorProjectTitle) DOM.editorProjectTitle.textContent = state.selectedProjectFilter;
      if (DOM.editorCrumbProject) DOM.editorCrumbProject.textContent = state.selectedProjectFilter.toUpperCase();
    } else {
      if (DOM.editorProjectTitle) DOM.editorProjectTitle.textContent = 'Execution Plan';
      if (DOM.editorCrumbProject) DOM.editorCrumbProject.textContent = 'ALL PROJECTS';
    }

    const highTasks = projectTasks.filter(t => (t.priority === 'high' || t.priority === 'urgent') && !t.completed);
    const inProgressTasks = projectTasks.filter(t => t.priority !== 'high' && t.priority !== 'urgent' && !t.completed);

    if (DOM.groupHighCount) DOM.groupHighCount.textContent = highTasks.length;
    if (DOM.groupInProgressCount) DOM.groupInProgressCount.textContent = inProgressTasks.length;

    DOM.editorGroupHigh.innerHTML = highTasks.length > 0
      ? highTasks.map(task => createEditorRowHTML(task)).join('')
      : '<p style="padding:16px; color:var(--color-slate-400); font-size:13px;">Nenhuma tarefa de alta prioridade.</p>';

    DOM.editorGroupInProgress.innerHTML = inProgressTasks.length > 0
      ? inProgressTasks.map(task => createEditorRowHTML(task)).join('')
      : '<p style="padding:16px; color:var(--color-slate-400); font-size:13px;">Nenhuma tarefa em andamento.</p>';

    renderDrawer();
  }

  function createEditorRowHTML(task) {
    const isSelected = task.id === state.selectedTaskId;
    const priorityLabel = (task.priority || 'med').toUpperCase();
    const priorityClass = `priority-${task.priority || 'medium'}`;

    return `
      <div class="editor-task-row ${isSelected ? 'selected' : ''}" data-task-id="${task.id}">
        <div class="etr-left" data-action="select-editor-task" data-id="${task.id}">
          <span class="drag-grip">⋮⋮</span>
          <button class="task-checkbox-custom ${task.completed ? 'checked' : ''}" data-action="toggle-complete" data-id="${task.id}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
          <span class="etr-key">#${task.id.slice(0, 7)}</span>
          <div style="min-width:0;">
            <div class="etr-title ${task.completed ? 'done' : ''}">${escapeHTML(task.title)}</div>
            <div class="etr-submeta">
              <span>🕒 ${escapeHTML(task.dueDate || 'No date')}</span>
              ${task.subtasks && task.subtasks.length > 0 ? `<span>• ≂ ${task.subtasks.filter(s => s.done).length}/${task.subtasks.length} subtasks</span>` : ''}
            </div>
          </div>
        </div>

        <div class="etr-right">
          <span class="badge-priority-chip ${priorityClass}">${priorityLabel}</span>
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" alt="User" class="avatar-micro">
          <button class="icon-btn-xs" data-action="select-editor-task" data-id="${task.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    `;
  }

  // 11. RENDERIZAÇÃO DO DRAWER DO EDITOR
  function renderDrawer() {
    const task = state.tasks.find(t => t.id === state.selectedTaskId) || state.tasks[0];
    if (!task) {
      if (DOM.drawerTitleInput) DOM.drawerTitleInput.value = '';
      if (DOM.drawerTaskKeyTag) DOM.drawerTaskKeyTag.textContent = '#---';
      if (DOM.drawerDescTextarea) DOM.drawerDescTextarea.value = '';
      if (DOM.drawerDueBannerText) DOM.drawerDueBannerText.textContent = 'Nenhuma tarefa selecionada';
      return;
    }

    state.selectedTaskId = task.id;

    if (DOM.drawerTitleInput) DOM.drawerTitleInput.value = task.title || '';
    if (DOM.drawerTaskKeyTag) DOM.drawerTaskKeyTag.textContent = `#${task.id.slice(0, 7)}`;
    if (DOM.drawerStatusSelect) DOM.drawerStatusSelect.value = task.status || (task.completed ? 'completed' : 'in_progress');
    if (DOM.drawerFieldStatus) DOM.drawerFieldStatus.value = task.status || (task.completed ? 'completed' : 'in_progress');
    if (DOM.drawerPrioritySelect) DOM.drawerPrioritySelect.value = task.priority || 'medium';
    if (DOM.drawerFieldPriority) DOM.drawerFieldPriority.value = task.priority || 'medium';
    if (DOM.drawerFieldAssignee) DOM.drawerFieldAssignee.value = task.assignee || 'Alex Morgan';
    if (DOM.drawerFieldDueDate) DOM.drawerFieldDueDate.value = task.dueDate || 'Today, 5:00 PM';
    if (DOM.drawerFieldProject) DOM.drawerFieldProject.value = task.project || 'Product Roadmap';
    if (DOM.drawerDescTextarea) DOM.drawerDescTextarea.value = task.description || '';
    if (DOM.drawerDueBannerText) DOM.drawerDueBannerText.textContent = `Due ${task.dueDate || 'Today, 5:00 PM'}`;

    if (DOM.drawerCompleteBtnText) {
      DOM.drawerCompleteBtnText.textContent = task.completed ? 'Reopen Task' : 'Mark Complete';
    }
    if (DOM.drawerBtnComplete) {
      DOM.drawerBtnComplete.style.backgroundColor = task.completed ? '#fee2e2' : '#d1fae5';
      DOM.drawerBtnComplete.style.color = task.completed ? '#dc2626' : '#065f46';
    }
  }

  // 12. CONTROLE DE MODAIS (Criação & Edição)
  function openCreateModal(initialTitle = '') {
    state.editingTask = null;
    DOM.modalTitleInput.value = initialTitle;
    DOM.modalDescInput.value = '';
    DOM.modalDueDateText.value = 'Today';
    DOM.modalDueTimeText.value = '05:00 PM';
    DOM.btnModalSubmitLabel.textContent = 'Create Task';

    setModalPriority('medium');
    state.tempModalSubtasks = [];
    renderModalSubtasks();

    DOM.taskModalOverlay.classList.add('open');
    DOM.modalTitleInput.focus();
  }

  function openEditModal(task) {
    state.editingTask = task;
    DOM.modalTitleInput.value = task.title || '';
    DOM.modalDescInput.value = task.description || '';
    DOM.modalDueDateText.value = task.dueDate || 'Today';
    DOM.btnModalSubmitLabel.textContent = 'Save Changes';

    setModalPriority(task.priority || 'medium');
    state.tempModalSubtasks = task.subtasks ? JSON.parse(JSON.stringify(task.subtasks)) : [];
    renderModalSubtasks();

    DOM.taskModalOverlay.classList.add('open');
    DOM.modalTitleInput.focus();
  }

  function closeModal() {
    DOM.taskModalOverlay.classList.remove('open');
    state.editingTask = null;
  }

  function setModalPriority(priority) {
    const btns = DOM.modalPriorityGroup.querySelectorAll('.pseg-btn');
    btns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-priority') === priority);
    });
  }

  function getModalSelectedPriority() {
    const active = DOM.modalPriorityGroup.querySelector('.pseg-btn.active');
    return active ? active.getAttribute('data-priority') : 'medium';
  }

  function renderModalSubtasks() {
    const total = state.tempModalSubtasks.length;
    const completed = state.tempModalSubtasks.filter(s => s.done).length;
    if (DOM.modalSubtasksCounter) {
      DOM.modalSubtasksCounter.textContent = `${completed} of ${total} completed`;
    }

    if (!DOM.modalSubtasksList) return;
    DOM.modalSubtasksList.innerHTML = state.tempModalSubtasks.map((st, idx) => `
      <div class="subtask-row">
        <input type="checkbox" class="subtask-chk" ${st.done ? 'checked' : ''} data-index="${idx}" id="mstk-${idx}">
        <label for="mstk-${idx}" class="subtask-label ${st.done ? 'strike' : ''}">${escapeHTML(st.text)}</label>
        <button type="button" class="subtask-remove-btn" data-index="${idx}" aria-label="Remover">✕</button>
      </div>
    `).join('');
  }

  // 13. OPERAÇÕES CRUD NO FIREBASE FIRESTORE
  async function handleSaveTaskFromModal() {
    const title = DOM.modalTitleInput.value.trim();
    if (!title) {
      showToast('Por favor, informe o título da tarefa.', 'error');
      DOM.modalTitleInput.focus();
      return;
    }

    const priority = getModalSelectedPriority();
    const project = DOM.modalProjectSelect ? DOM.modalProjectSelect.value : 'Product Roadmap';
    const dueDateStr = `${DOM.modalDueDateText.value}${DOM.modalDueTimeText.value ? ', ' + DOM.modalDueTimeText.value : ''}`;

    // Desabilita botão durante a operação
    const submitBtn = DOM.btnModalSubmit;
    if (submitBtn) submitBtn.disabled = true;

    try {
      if (state.editingTask) {
        // Atualização via updateDoc
        const taskId = state.editingTask.id;
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, {
          title: title,
          description: DOM.modalDescInput.value.trim(),
          priority: priority,
          project: project,
          category: project,
          dueDate: dueDateStr,
          subtasks: [...state.tempModalSubtasks],
          updatedAt: serverTimestamp()
        });
        showToast('Tarefa atualizada com sucesso!', 'success');
      } else {
        // Criação de Nova Tarefa via addDoc
        const tasksRef = collection(db, "tasks");
        const docRef = await addDoc(tasksRef, {
          title: title,
          description: DOM.modalDescInput.value.trim(),
          project: project,
          category: project,
          priority: priority,
          dueDate: dueDateStr,
          dueDateRaw: new Date().toISOString(),
          timeSlot: 'today',
          status: 'in_progress',
          completed: false,
          completedAt: null,
          assignee: 'Alex Morgan',
          labels: ['#taskflow'],
          subtasks: [...state.tempModalSubtasks],
          estimatedTime: '2.0 hrs',
          trackedTime: '0 hrs',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        state.selectedTaskId = docRef.id;
        showToast('Nova tarefa criada com sucesso!', 'success');
      }

      closeModal();
    } catch (err) {
      console.error('Erro ao salvar tarefa no Firestore:', err);
      showToast('Falha ao salvar tarefa no Firestore: ' + (err.message || 'Erro de permissão ou conexão'), 'error');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  }

  async function handleQuickBarAdd() {
    const val = DOM.quickBarInput.value.trim();
    if (!val) return;

    const quickBtn = DOM.btnQuickBarAdd;
    if (quickBtn) quickBtn.disabled = true;

    try {
      const tasksRef = collection(db, "tasks");
      const docRef = await addDoc(tasksRef, {
        title: val,
        description: '',
        project: 'Product Roadmap',
        category: 'Product Roadmap',
        priority: 'medium',
        dueDate: 'Today, 5:00 PM',
        dueDateRaw: new Date().toISOString(),
        timeSlot: 'today',
        status: 'in_progress',
        completed: false,
        completedAt: null,
        assignee: 'Alex Morgan',
        labels: ['#quick'],
        subtasks: [],
        estimatedTime: '1.0 hrs',
        trackedTime: '0 hrs',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      DOM.quickBarInput.value = '';
      state.selectedTaskId = docRef.id;
      showToast('Tarefa adicionada com sucesso!', 'success');
    } catch (err) {
      console.error('Erro ao criar tarefa rápida no Firestore:', err);
      showToast('Falha ao adicionar tarefa: ' + (err.message || 'Erro no banco de dados'), 'error');
    } finally {
      if (quickBtn) quickBtn.disabled = false;
    }
  }

  async function toggleTaskComplete(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;

    const newCompleted = !task.completed;
    const completedAtStr = newCompleted ? ('Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) : null;
    const newStatus = newCompleted ? 'completed' : 'in_progress';

    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, {
        completed: newCompleted,
        status: newStatus,
        completedAt: completedAtStr,
        updatedAt: serverTimestamp()
      });

      showToast(newCompleted ? `Tarefa marcada como concluída!` : `Tarefa reaberta.`, 'success');
    } catch (err) {
      console.error('Erro ao alternar conclusão da tarefa no Firestore:', err);
      showToast('Não foi possível atualizar o status da tarefa no Firestore.', 'error');
    }
  }

  async function saveDrawerTask() {
    const task = state.tasks.find(t => t.id === state.selectedTaskId);
    if (!task) return;

    const newTitle = DOM.drawerTitleInput.value.trim();
    if (!newTitle) {
      showToast('O título não pode ficar vazio.', 'error');
      return;
    }

    const saveBtn = DOM.drawerBtnSave;
    if (saveBtn) saveBtn.disabled = true;

    try {
      const taskRef = doc(db, "tasks", task.id);
      const isCompleted = (DOM.drawerFieldStatus.value === 'completed');

      await updateDoc(taskRef, {
        title: newTitle,
        description: DOM.drawerDescTextarea.value.trim(),
        priority: DOM.drawerFieldPriority.value,
        status: DOM.drawerFieldStatus.value,
        assignee: DOM.drawerFieldAssignee.value,
        dueDate: DOM.drawerFieldDueDate.value,
        project: DOM.drawerFieldProject.value,
        category: DOM.drawerFieldProject.value,
        completed: isCompleted,
        updatedAt: serverTimestamp()
      });

      showToast('Alterações salvas no Firestore!', 'success');
    } catch (err) {
      console.error('Erro ao salvar tarefa pelo drawer no Firestore:', err);
      showToast('Falha ao salvar alterações: ' + (err.message || 'Erro no Firestore'), 'error');
    } finally {
      if (saveBtn) saveBtn.disabled = false;
    }
  }

  function promptDeleteTask(taskId) {
    state.deletingTaskId = taskId;
    DOM.confirmDeleteModal.style.display = 'flex';
  }

  async function confirmDelete() {
    if (!state.deletingTaskId) return;
    const taskIdToDelete = state.deletingTaskId;
    const confirmBtn = DOM.btnConfirmDelete;

    if (confirmBtn) confirmBtn.disabled = true;

    try {
      await deleteDoc(doc(db, "tasks", taskIdToDelete));
      showToast('Tarefa removida permanentemente do Firestore.', 'info');
      
      DOM.confirmDeleteModal.style.display = 'none';
      state.deletingTaskId = null;
    } catch (err) {
      console.error('Erro ao excluir documento no Firestore:', err);
      showToast('Não foi possível excluir a tarefa: ' + (err.message || 'Erro de permissão'), 'error');
    } finally {
      if (confirmBtn) confirmBtn.disabled = false;
    }
  }

  function cancelDelete() {
    DOM.confirmDeleteModal.style.display = 'none';
    state.deletingTaskId = null;
  }

  // 14. SINCRONIZAÇÃO GERAL DE RENDERIZAÇÃO
  function renderAll() {
    updateMetrics();
    if (state.currentView === 'dashboard') {
      renderDashboardTasks();
    } else if (state.currentView === 'completed') {
      renderCompletedTasks();
    } else if (state.currentView === 'editor') {
      renderEditorTasks();
    }
  }

  // 15. REGISTRO DE EVENTOS (EVENT LISTENERS)
  function attachEventListeners() {
    // Navegação Sidebar
    DOM.navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const navTarget = link.getAttribute('data-nav');
        if (navTarget === 'dashboard') {
          state.currentFilter = 'all';
          state.selectedProjectFilter = null;
          switchView('dashboard');
        } else if (navTarget === 'my-tasks') {
          state.currentFilter = 'all';
          state.selectedProjectFilter = null;
          switchView('dashboard');
        } else if (navTarget === 'today') {
          state.currentFilter = 'today';
          state.selectedProjectFilter = null;
          switchView('dashboard');
        } else if (navTarget === 'upcoming') {
          state.currentFilter = 'upcoming';
          state.selectedProjectFilter = null;
          switchView('dashboard');
        } else if (navTarget === 'completed') {
          switchView('completed');
        } else if (navTarget === 'project') {
          const prj = link.getAttribute('data-project');
          state.selectedProjectFilter = prj;
          switchView('editor');
        }
      });
    });

    // Mobile Hamburger & Backdrop
    if (DOM.mobileMenuBtn) {
      DOM.mobileMenuBtn.addEventListener('click', () => {
        DOM.sidebar.classList.toggle('open');
        DOM.sidebarBackdrop.classList.toggle('open');
      });
    }
    if (DOM.sidebarBackdrop) {
      DOM.sidebarBackdrop.addEventListener('click', () => {
        DOM.sidebar.classList.remove('open');
        DOM.sidebarBackdrop.classList.remove('open');
      });
    }

    // Botões de Abertura do Modal de Criação
    const openCreateBtns = [
      DOM.btnHeaderNewTask,
      DOM.btnQuickAdd,
      DOM.btnDashboardNewTask,
      DOM.btnCompletedNewTask,
      DOM.btnPlanTomorrow,
      DOM.mobileAddBtn
    ];
    openCreateBtns.forEach(btn => {
      if (btn) btn.addEventListener('click', () => openCreateModal());
    });

    // Modal Events
    if (DOM.btnModalCancel) DOM.btnModalCancel.addEventListener('click', closeModal);
    if (DOM.btnModalSubmit) DOM.btnModalSubmit.addEventListener('click', handleSaveTaskFromModal);
    
    // Segmented Priority Buttons in Modal
    if (DOM.modalPriorityGroup) {
      DOM.modalPriorityGroup.addEventListener('click', e => {
        const btn = e.target.closest('.pseg-btn');
        if (btn) {
          const priority = btn.getAttribute('data-priority');
          setModalPriority(priority);
        }
      });
    }

    // Adicionar Subtarefa no Modal
    if (DOM.btnModalAddSubtask) {
      DOM.btnModalAddSubtask.addEventListener('click', () => {
        const text = prompt('Digite a nova subtarefa:');
        if (text && text.trim()) {
          state.tempModalSubtasks.push({
            id: 'mst-' + Date.now(),
            text: text.trim(),
            done: false
          });
          renderModalSubtasks();
        }
      });
    }

    // Toggle / Remover Subtarefas no Modal
    if (DOM.modalSubtasksList) {
      DOM.modalSubtasksList.addEventListener('click', e => {
        if (e.target.classList.contains('subtask-chk')) {
          const idx = parseInt(e.target.getAttribute('data-index'), 10);
          if (state.tempModalSubtasks[idx]) {
            state.tempModalSubtasks[idx].done = e.target.checked;
            renderModalSubtasks();
          }
        } else if (e.target.classList.contains('subtask-remove-btn')) {
          const idx = parseInt(e.target.getAttribute('data-index'), 10);
          state.tempModalSubtasks.splice(idx, 1);
          renderModalSubtasks();
        }
      });
    }

    // Quick Date Pills in Modal
    const quickDatePills = document.querySelectorAll('.date-pill');
    quickDatePills.forEach(pill => {
      pill.addEventListener('click', () => {
        quickDatePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const q = pill.getAttribute('data-quick');
        if (q === 'today') DOM.modalDueDateText.value = 'Today';
        else if (q === 'tomorrow') DOM.modalDueDateText.value = 'Tomorrow';
        else if (q === 'next-week') DOM.modalDueDateText.value = 'Next Week';
      });
    });

    // Bottom Quick Add Bar
    if (DOM.btnQuickBarAdd) DOM.btnQuickBarAdd.addEventListener('click', handleQuickBarAdd);
    if (DOM.quickBarInput) {
      DOM.quickBarInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleQuickBarAdd();
        }
      });
    }

    // Filtros de Tab do Dashboard (All, Today, Upcoming, Completed)
    DOM.filterTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        DOM.filterTabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentFilter = btn.getAttribute('data-filter');
        renderDashboardTasks();
      });
    });

    // Busca de Tarefas
    if (DOM.topSearchInput) {
      DOM.topSearchInput.addEventListener('input', e => {
        state.searchQuery = e.target.value;
        renderAll();
      });
    }
    if (DOM.taskListSearchInput) {
      DOM.taskListSearchInput.addEventListener('input', e => {
        state.searchQuery = e.target.value;
        renderDashboardTasks();
      });
    }

    // Alternar Ordenação
    if (DOM.sortDropdownBtn) {
      DOM.sortDropdownBtn.addEventListener('click', () => {
        if (state.currentSort === 'dueDate') {
          state.currentSort = 'priority';
          DOM.sortCurrentLabel.textContent = 'Priority';
        } else if (state.currentSort === 'priority') {
          state.currentSort = 'title';
          DOM.sortCurrentLabel.textContent = 'Title';
        } else {
          state.currentSort = 'dueDate';
          DOM.sortCurrentLabel.textContent = 'Due Date';
        }
        renderDashboardTasks();
        showToast(`Ordenado por: ${DOM.sortCurrentLabel.textContent}`, 'info');
      });
    }

    // Clique nas Tarefas (Dashboard Stream Delegated)
    if (DOM.dashboardTaskStream) {
      DOM.dashboardTaskStream.addEventListener('click', e => {
        const toggleBtn = e.target.closest('[data-action="toggle-complete"]');
        if (toggleBtn) {
          e.stopPropagation();
          const taskId = toggleBtn.getAttribute('data-id');
          toggleTaskComplete(taskId);
          return;
        }

        const card = e.target.closest('.task-item-card');
        if (card) {
          const taskId = card.getAttribute('data-task-id');
          state.selectedTaskId = taskId;
          switchView('editor');
        }
      });
    }

    // Clique na Lista Completed
    if (DOM.completedItemsStream) {
      DOM.completedItemsStream.addEventListener('click', e => {
        const toggleBtn = e.target.closest('[data-action="toggle-complete"]');
        if (toggleBtn) {
          const taskId = toggleBtn.getAttribute('data-id');
          toggleTaskComplete(taskId);
          return;
        }
        const row = e.target.closest('.completed-row-item');
        if (row) {
          const taskId = row.getAttribute('data-task-id');
          state.selectedTaskId = taskId;
          switchView('editor');
        }
      });
    }

    // Clique no Editor Rows
    if (DOM.viewEditor) {
      DOM.viewEditor.addEventListener('click', e => {
        const toggleBtn = e.target.closest('[data-action="toggle-complete"]');
        if (toggleBtn) {
          e.stopPropagation();
          const taskId = toggleBtn.getAttribute('data-id');
          toggleTaskComplete(taskId);
          return;
        }

        const editorRow = e.target.closest('.editor-task-row');
        if (editorRow) {
          const taskId = editorRow.getAttribute('data-task-id');
          state.selectedTaskId = taskId;
          renderEditorTasks();
        }
      });
    }

    // Drawer Buttons & Inputs
    if (DOM.drawerBtnSave) DOM.drawerBtnSave.addEventListener('click', saveDrawerTask);
    if (DOM.drawerBtnDelete) {
      DOM.drawerBtnDelete.addEventListener('click', () => {
        if (state.selectedTaskId) {
          promptDeleteTask(state.selectedTaskId);
        }
      });
    }
    if (DOM.drawerBtnComplete) {
      DOM.drawerBtnComplete.addEventListener('click', () => {
        if (state.selectedTaskId) {
          toggleTaskComplete(state.selectedTaskId);
          renderDrawer();
        }
      });
    }
    if (DOM.btnCopyTaskKey) {
      DOM.btnCopyTaskKey.addEventListener('click', () => {
        if (!state.selectedTaskId) return;
        navigator.clipboard.writeText(state.selectedTaskId).then(() => {
          showToast(`Chave #${state.selectedTaskId} copiada!`, 'info');
        }).catch(() => {
          showToast(`Chave #${state.selectedTaskId}`, 'info');
        });
      });
    }

    // Confirmação de Exclusão
    if (DOM.btnConfirmDelete) DOM.btnConfirmDelete.addEventListener('click', confirmDelete);
    if (DOM.btnCancelDelete) DOM.btnCancelDelete.addEventListener('click', cancelDelete);

    // Limpar Arquivo (Completed View)
    if (DOM.btnClearArchive) {
      DOM.btnClearArchive.addEventListener('click', async () => {
        const completedList = state.tasks.filter(t => t.completed);
        if (completedList.length === 0) {
          showToast('Não há tarefas arquivadas para limpar.', 'info');
          return;
        }
        if (confirm(`Deseja remover as ${completedList.length} tarefas concluídas permanentemente do Firestore?`)) {
          try {
            for (const t of completedList) {
              await deleteDoc(doc(db, "tasks", t.id));
            }
            showToast('Arquivo de tarefas concluídas limpo com sucesso!', 'success');
          } catch (err) {
            console.error('Erro ao limpar tarefas arquivadas:', err);
            showToast('Erro ao remover algumas tarefas arquivadas.', 'error');
          }
        }
      });
    }

    // Exportar CSV
    if (DOM.btnExportCSV) {
      DOM.btnExportCSV.addEventListener('click', () => {
        const headers = ['ID', 'Title', 'Project', 'Priority', 'Status', 'Completed', 'Due Date'];
        const rows = state.tasks.map(t => [
          t.id,
          `"${(t.title || '').replace(/"/g, '""')}"`,
          `"${t.project || ''}"`,
          t.priority || 'medium',
          t.status || 'in_progress',
          t.completed ? 'Yes' : 'No',
          `"${t.dueDate || ''}"`
        ]);
        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `taskflow_export_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Exportação CSV concluída!', 'success');
      });
    }

    // Atalhos Globais de Teclado
    window.addEventListener('keydown', e => {
      if ((e.key === 'n' || e.key === 'N') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        openCreateModal();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (DOM.topSearchInput) DOM.topSearchInput.focus();
        return;
      }
      if (e.key === 'Escape') {
        if (DOM.taskModalOverlay && DOM.taskModalOverlay.classList.contains('open')) {
          closeModal();
        }
        if (DOM.confirmDeleteModal && DOM.confirmDeleteModal.style.display === 'flex') {
          cancelDelete();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        if (DOM.taskModalOverlay && DOM.taskModalOverlay.classList.contains('open')) {
          e.preventDefault();
          handleSaveTaskFromModal();
        }
      }
    });

    // Cleanup listener on unload
    window.addEventListener('beforeunload', () => {
      if (unsubscribeTasks) {
        unsubscribeTasks();
      }
    });
  }

  // 16. INICIALIZAÇÃO DA APLICAÇÃO
  function init() {
    attachEventListeners();
    switchView('dashboard');
    initFirestoreListener();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
