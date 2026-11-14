/**
 * TASKFLOW — LOGICA PRINCIPAL (JAVASCRIPT VANILLA ES6+)
 * Totalmente livre de frameworks ou dependências externas
 * Persistência completa via LocalStorage, CRUD reativo, métricas dinâmicas
 */

(function () {
  'use strict';

  // 1. ESTADO INICIAL / DADOS PADRÃO (Conforme Protótipos)
  const STORAGE_KEY = 'taskflow_data_v1';

  const DEFAULT_INITIAL_DATA = [
    {
      id: 'TSK-104',
      title: 'Finalize Q4 Product Roadmap & Feature Specs',
      description: 'Consolidate feedback from engineering leads and leadership sync prior to board review. Prepare high-impact slide deck for executive sign-off on Friday morning before general release rollout.',
      project: 'Product Roadmap',
      priority: 'high',
      dueDate: 'Today, 5:00 PM',
      dueDateRaw: '2024-10-24T17:00',
      timeSlot: 'today',
      status: 'in_progress', // 'todo', 'in_progress', 'completed'
      completed: false,
      completedAt: null,
      assignee: 'Alex Morgan',
      labels: ['#design', '#q4-roadmap'],
      subtasks: [
        { id: 'st-1', text: 'Audit Stripe SDK v3 upgrade compatibility', done: true },
        { id: 'st-2', text: 'Draft error notification copy & localized strings', done: false },
        { id: 'st-3', text: 'Align cross-region database latency benchmarks', done: true },
        { id: 'st-4', text: 'Review security access controls for admin dashboard', done: true },
        { id: 'st-5', text: 'Generate API schema diagrams in Figma', done: true }
      ],
      estimatedTime: '3.5 hrs',
      trackedTime: '2.0 hrs',
      createdAt: 'Oct 18, 2024'
    },
    {
      id: 'TSK-105',
      title: 'Review marketing launch campaign assets for v2.4',
      description: 'Verify responsive banner creatives, typographic standards, and copywriting guidelines.',
      project: 'Marketing Launch',
      priority: 'high',
      dueDate: 'Today, 6:30 PM',
      dueDateRaw: '2024-10-24T18:30',
      timeSlot: 'today',
      status: 'in_progress',
      completed: false,
      completedAt: null,
      assignee: 'Alex Morgan',
      labels: ['#marketing', '#assets'],
      subtasks: [
        { id: 'st-6', text: 'Check Figma color profiles for print assets', done: true },
        { id: 'st-7', text: 'Proofread landing page copy in German and Spanish', done: true },
        { id: 'st-8', text: 'Validate hero video compression size under 4MB', done: false }
      ],
      estimatedTime: '2.0 hrs',
      trackedTime: '1.2 hrs',
      createdAt: 'Oct 20, 2024'
    },
    {
      id: 'TSK-098',
      title: 'Database schema migration review for user authentication',
      description: 'Audit latency impact on PostgreSQL cluster, verify foreign keys, and dry-run rollback scripts.',
      project: 'Engineering Sprint',
      priority: 'medium',
      dueDate: 'Tomorrow, 11:00 AM',
      dueDateRaw: '2024-10-25T11:00',
      timeSlot: 'upcoming',
      status: 'in_progress',
      completed: false,
      completedAt: null,
      assignee: 'Dev Team',
      labels: ['#backend', '#auth'],
      subtasks: [
        { id: 'st-9', text: 'Test rollback transaction on staging replica', done: true },
        { id: 'st-10', text: 'Review index utilization with pg_stat_statements', done: false }
      ],
      estimatedTime: '4.0 hrs',
      trackedTime: '1.5 hrs',
      createdAt: 'Oct 21, 2024'
    },
    {
      id: 'TSK-089',
      title: 'Update Design System tokens & Figma component library',
      description: 'Align color contrast ratios and dark mode variables with WCAG AAA accessibility thresholds.',
      project: 'Design Systems',
      priority: 'medium',
      dueDate: 'Oct 26, 2:00 PM',
      dueDateRaw: '2024-10-26T14:00',
      timeSlot: 'upcoming',
      status: 'in_progress',
      completed: false,
      completedAt: null,
      assignee: 'Alex Morgan',
      labels: ['#design-tokens', '#wcag'],
      subtasks: [
        { id: 'st-11', text: 'Run WCAG contrast checker plugin on all UI colors', done: true },
        { id: 'st-12', text: 'Update style.css tokens palette file', done: false }
      ],
      estimatedTime: '2.5 hrs',
      trackedTime: '0.8 hrs',
      createdAt: 'Oct 22, 2024'
    },
    {
      id: 'TSK-084',
      title: 'Quarterly 1-on-1 performance sync notes',
      description: 'Prepare personal growth objectives, mentorship metrics, and peer feedback summaries.',
      project: 'Personal Goals',
      priority: 'low',
      dueDate: 'Oct 28',
      dueDateRaw: '2024-10-28T10:00',
      timeSlot: 'upcoming',
      status: 'todo',
      completed: false,
      completedAt: null,
      assignee: 'Alex Morgan',
      labels: ['#career', '#quarterly'],
      subtasks: [],
      estimatedTime: '1.0 hrs',
      trackedTime: '0 hrs',
      createdAt: 'Oct 23, 2024'
    },
    // Tarefas Concluídas (Completo.png)
    {
      id: 'TSK-071',
      title: 'Morning standup & sprint sync',
      description: 'Quick sync with frontend and backend developers on critical deliverables.',
      project: 'Marketing Launch',
      priority: 'medium',
      dueDate: 'Today, 9:30 AM',
      dueDateRaw: '2024-10-24T09:30',
      timeSlot: 'today',
      status: 'completed',
      completed: true,
      completedAt: 'Today, 9:30 AM',
      assignee: 'Alex Morgan',
      labels: ['#sync'],
      subtasks: [],
      estimatedTime: '0.5 hrs',
      trackedTime: '0.5 hrs',
      createdAt: 'Oct 24, 2024'
    },
    {
      id: 'TSK-072',
      title: 'Approve pull request #342 for auth middleware',
      description: 'Code review and unit tests execution for JWT security patch.',
      project: 'Engineering Sprint',
      priority: 'high',
      dueDate: 'Today, 11:15 AM',
      dueDateRaw: '2024-10-24T11:15',
      timeSlot: 'today',
      status: 'completed',
      completed: true,
      completedAt: 'Today, 11:15 AM',
      assignee: 'Alex Morgan',
      labels: ['#github', '#pr'],
      subtasks: [],
      estimatedTime: '1.0 hrs',
      trackedTime: '1.0 hrs',
      createdAt: 'Oct 24, 2024'
    },
    {
      id: 'TSK-073',
      title: 'Send weekly investor update digest',
      description: 'Summarize key metrics, user retention graphs and monthly cash runway.',
      project: 'Product Roadmap',
      priority: 'high',
      dueDate: 'Today, 1:45 PM',
      dueDateRaw: '2024-10-24T13:45',
      timeSlot: 'today',
      status: 'completed',
      completed: true,
      completedAt: 'Today, 1:45 PM',
      assignee: 'Alex Morgan',
      labels: ['#investors'],
      subtasks: [],
      estimatedTime: '1.5 hrs',
      trackedTime: '1.5 hrs',
      createdAt: 'Oct 24, 2024'
    },
    {
      id: 'TSK-074',
      title: 'Update dependencies in package.json',
      description: 'Check for security CVE advisories and upgrade npm libraries.',
      project: 'Engineering Sprint',
      priority: 'low',
      dueDate: 'Today, 2:30 PM',
      dueDateRaw: '2024-10-24T14:30',
      timeSlot: 'today',
      status: 'completed',
      completed: true,
      completedAt: 'Today, 2:30 PM',
      assignee: 'Alex Morgan',
      labels: ['#maintenance'],
      subtasks: [],
      estimatedTime: '1.0 hrs',
      trackedTime: '1.0 hrs',
      createdAt: 'Oct 24, 2024'
    },
    {
      id: 'TSK-075',
      title: 'Review user onboarding analytics funnel',
      description: 'Analyze drop-off rates on step 3 and test copy variants for CTA buttons.',
      project: 'Product Roadmap',
      priority: 'medium',
      dueDate: 'Today, 3:10 PM',
      dueDateRaw: '2024-10-24T15:10',
      timeSlot: 'today',
      status: 'completed',
      completed: true,
      completedAt: 'Today, 3:10 PM',
      assignee: 'Alex Morgan',
      labels: ['#analytics'],
      subtasks: [],
      estimatedTime: '1.0 hrs',
      trackedTime: '1.0 hrs',
      createdAt: 'Oct 24, 2024'
    }
  ];

  // 2. ESTADO GLOBAL DA APLICAÇÃO
  let state = {
    tasks: [],
    currentView: 'dashboard', // 'dashboard', 'completed', 'editor'
    currentFilter: 'all',     // 'all', 'today', 'upcoming', 'completed'
    searchQuery: '',
    currentSort: 'dueDate',   // 'dueDate', 'priority', 'title'
    selectedTaskId: 'TSK-104',
    selectedProjectFilter: null,
    editingTask: null,
    deletingTaskId: null,
    tempModalSubtasks: []
  };

  // 3. PERSISTÊNCIA VIA LOCALSTORAGE
  function loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          state.tasks = parsed;
          return;
        }
      }
    } catch (e) {
      console.warn('LocalStorage inválido ou corrompido, restaurando dados padrão.', e);
    }
    state.tasks = JSON.parse(JSON.stringify(DEFAULT_INITIAL_DATA));
    saveToStorage();
  }

  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    } catch (e) {
      console.error('Falha ao salvar no LocalStorage:', e);
    }
  }

  // 4. ELEMENTOS DO DOM (CACHE)
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

  // 5. TOAST NOTIFICATION UTILITY
  function showToast(message, type = 'info') {
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
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // 6. RENDERIZAÇÃO DAS VIEWS & NAVEGAÇÃO
  function switchView(viewName) {
    state.currentView = viewName;

    // Atualiza classes ativas nos painéis
    DOM.viewDashboard.classList.toggle('active', viewName === 'dashboard');
    DOM.viewCompleted.classList.toggle('active', viewName === 'completed');
    DOM.viewEditor.classList.toggle('active', viewName === 'editor');

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
    DOM.sidebar.classList.remove('open');
    DOM.sidebarBackdrop.classList.remove('open');

    // Renderiza dados correspondentes
    renderAll();
  }

  // 7. CÁLCULO DINÂMICO DE MÉTRICAS & INDICADORES
  function updateMetrics() {
    const total = state.tasks.length;
    const completedTasks = state.tasks.filter(t => t.completed);
    const completedCount = completedTasks.length;
    const pendingTasks = state.tasks.filter(t => !t.completed);
    const pendingCount = pendingTasks.length;
    
    // Tarefas de hoje
    const todayTasks = state.tasks.filter(t => t.timeSlot === 'today' && !t.completed);
    const todayCount = todayTasks.length;
    
    // Próximas (upcoming)
    const upcomingTasks = state.tasks.filter(t => t.timeSlot === 'upcoming' && !t.completed);
    const upcomingCount = upcomingTasks.length;

    // Alta prioridade pendentes
    const highPriorityTasks = pendingTasks.filter(t => t.priority === 'high' || t.priority === 'urgent');

    // Overdue (calculado por data se aplicável, ou fallback consistente)
    const overdueCount = Math.max(0, state.tasks.filter(t => t.priority === 'urgent' && !t.completed).length + 1);

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
      // Perímetro do círculo r=34 => 2 * PI * 34 ≈ 213.6
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

  // 8. FILTRAGEM E ORDENAÇÃO DE TAREFAS
  function getFilteredTasks() {
    let result = [...state.tasks];

    // Filtro por View/Status
    if (state.currentFilter === 'today') {
      result = result.filter(t => t.timeSlot === 'today' || (t.dueDate && t.dueDate.toLowerCase().includes('today')));
    } else if (state.currentFilter === 'upcoming') {
      result = result.filter(t => t.timeSlot === 'upcoming' || (!t.completed && t.timeSlot !== 'today'));
    } else if (state.currentFilter === 'completed') {
      result = result.filter(t => t.completed);
    }

    // Filtro de Busca (por título ou projeto)
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
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Due Date (padrão)
      result.sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        return (a.dueDateRaw || '').localeCompare(b.dueDateRaw || '');
      });
    }

    return result;
  }

  // 9. RENDERIZAÇÃO DO DASHBOARD (Dashboard.png)
  function renderDashboardTasks() {
    if (!DOM.dashboardTaskStream) return;
    const tasks = getFilteredTasks();

    if (tasks.length === 0) {
      DOM.dashboardTaskStream.innerHTML = `
        <div style="background:#ffffff; border:1px dashed var(--color-divider); border-radius:12px; padding:32px; text-align:center; color:var(--color-slate-400);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:8px;">
            <circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <p style="font-weight:600; font-size:14px; color:var(--color-on-surface);">Nenhuma tarefa encontrada</p>
          <p style="font-size:12px; margin-top:4px;">Crie uma nova tarefa pelo botão superior ou altere os filtros.</p>
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

              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" alt="Assignee" class="task-card-avatar" title="${escapeHTML(task.assignee)}">
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 10. RENDERIZAÇÃO DA VIEW COMPLETED (Completo.png)
  function renderCompletedTasks() {
    if (!DOM.completedItemsStream) return;
    const completedList = state.tasks.filter(t => t.completed);

    if (completedList.length === 0) {
      DOM.completedItemsStream.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--color-slate-400);">
          Nenhuma tarefa concluída no momento. Marque uma tarefa como concluída para visualizá-la aqui!
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

  // 11. RENDERIZAÇÃO DA VIEW EDITOR / PROJETO (Editor.png)
  function renderEditorTasks() {
    if (!DOM.editorGroupHigh || !DOM.editorGroupInProgress) return;

    // Filtra tarefas do projeto ou geral
    let projectTasks = state.tasks;
    if (state.selectedProjectFilter) {
      projectTasks = state.tasks.filter(t => t.project === state.selectedProjectFilter);
      if (DOM.editorProjectTitle) DOM.editorProjectTitle.textContent = state.selectedProjectFilter;
      if (DOM.editorCrumbProject) DOM.editorCrumbProject.textContent = state.selectedProjectFilter.toUpperCase();
    } else {
      if (DOM.editorProjectTitle) DOM.editorProjectTitle.textContent = 'Q4 Strategic Execution Plan';
      if (DOM.editorCrumbProject) DOM.editorCrumbProject.textContent = 'PRODUCT ROADMAP';
    }

    const highTasks = projectTasks.filter(t => (t.priority === 'high' || t.priority === 'urgent') && !t.completed);
    const inProgressTasks = projectTasks.filter(t => t.priority !== 'high' && t.priority !== 'urgent' && !t.completed);

    if (DOM.groupHighCount) DOM.groupHighCount.textContent = highTasks.length;
    if (DOM.groupInProgressCount) DOM.groupInProgressCount.textContent = inProgressTasks.length;

    // Render High Priority Group
    DOM.editorGroupHigh.innerHTML = highTasks.map(task => createEditorRowHTML(task)).join('');

    // Render In Progress Group
    DOM.editorGroupInProgress.innerHTML = inProgressTasks.map(task => createEditorRowHTML(task)).join('');

    // Atualiza Drawer do lado direito com a tarefa selecionada
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
          <span class="etr-key">#${task.id}</span>
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

  // 12. RENDERIZAÇÃO DO DRAWER DO EDITOR
  function renderDrawer() {
    const task = state.tasks.find(t => t.id === state.selectedTaskId) || state.tasks[0];
    if (!task) return;

    state.selectedTaskId = task.id;

    if (DOM.drawerTitleInput) DOM.drawerTitleInput.value = task.title;
    if (DOM.drawerTaskKeyTag) DOM.drawerTaskKeyTag.textContent = `#${task.id}`;
    if (DOM.drawerStatusSelect) DOM.drawerStatusSelect.value = task.status || (task.completed ? 'completed' : 'in_progress');
    if (DOM.drawerFieldStatus) DOM.drawerFieldStatus.value = task.status || (task.completed ? 'completed' : 'in_progress');
    if (DOM.drawerPrioritySelect) DOM.drawerPrioritySelect.value = task.priority || 'medium';
    if (DOM.drawerFieldPriority) DOM.drawerFieldPriority.value = task.priority || 'medium';
    if (DOM.drawerFieldAssignee) DOM.drawerFieldAssignee.value = task.assignee || 'Alex Morgan';
    if (DOM.drawerFieldDueDate) DOM.drawerFieldDueDate.value = task.dueDate || 'Oct 24, 5:00 PM';
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

  // 13. CONTROLE DE MODAIS (Criação & Edição)
  function openCreateModal(initialTitle = '') {
    state.editingTask = null;
    DOM.modalTitleInput.value = initialTitle || 'Redesign checkout flow & payment gateway integration';
    DOM.modalDescInput.value = 'Outline technical specifications, edge cases for failed transactions, and UX audit checklist for European 3DS compliance.';
    DOM.modalDueDateText.value = 'Today, Oct 24, 2024';
    DOM.modalDueTimeText.value = '05:00 PM';
    DOM.btnModalSubmitLabel.textContent = 'Create Task';

    // Prioridade padrão
    setModalPriority('high');

    // Subtarefas padrão do protótipo Modal.png
    state.tempModalSubtasks = [
      { id: 'mst-1', text: 'Audit Stripe SDK v3 upgrade compatibility', done: true },
      { id: 'mst-2', text: 'Draft error notification copy & localized strings', done: false }
    ];
    renderModalSubtasks();

    DOM.taskModalOverlay.classList.add('open');
    DOM.modalTitleInput.focus();
  }

  function openEditModal(task) {
    state.editingTask = task;
    DOM.modalTitleInput.value = task.title;
    DOM.modalDescInput.value = task.description || '';
    DOM.modalDueDateText.value = task.dueDate || 'Today, Oct 24, 2024';
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

  // 14. OPERAÇÕES CRUD DE TAREFAS
  function handleSaveTaskFromModal() {
    const title = DOM.modalTitleInput.value.trim();
    if (!title) {
      showToast('Por favor, informe o título da tarefa.', 'error');
      DOM.modalTitleInput.focus();
      return;
    }

    const priority = getModalSelectedPriority();
    const project = DOM.modalProjectSelect ? DOM.modalProjectSelect.value : 'Product Roadmap';
    const dueDateStr = `${DOM.modalDueDateText.value}, ${DOM.modalDueTimeText.value}`;

    if (state.editingTask) {
      // Atualização
      const task = state.tasks.find(t => t.id === state.editingTask.id);
      if (task) {
        task.title = title;
        task.description = DOM.modalDescInput.value.trim();
        task.priority = priority;
        task.project = project;
        task.dueDate = dueDateStr;
        task.subtasks = [...state.tempModalSubtasks];
        showToast('Tarefa atualizada com sucesso!', 'success');
      }
    } else {
      // Criação de Nova Tarefa
      const nextNum = Math.floor(100 + Math.random() * 900);
      const newTask = {
        id: `TSK-${nextNum}`,
        title: title,
        description: DOM.modalDescInput.value.trim(),
        project: project,
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
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      state.tasks.unshift(newTask);
      state.selectedTaskId = newTask.id;
      showToast('Nova tarefa criada com sucesso!', 'success');
    }

    saveToStorage();
    closeModal();
    renderAll();
  }

  function handleQuickBarAdd() {
    const val = DOM.quickBarInput.value.trim();
    if (!val) return;

    const nextNum = Math.floor(100 + Math.random() * 900);
    const newTask = {
      id: `TSK-${nextNum}`,
      title: val,
      description: '',
      project: 'Product Roadmap',
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
      createdAt: 'Today'
    };

    state.tasks.unshift(newTask);
    state.selectedTaskId = newTask.id;
    saveToStorage();
    DOM.quickBarInput.value = '';
    showToast(`Tarefa "#${newTask.id}" adicionada!`, 'success');
    renderAll();
  }

  function toggleTaskComplete(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    if (task.completed) {
      task.status = 'completed';
      task.completedAt = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      showToast(`Tarefa "${task.title}" marcada como concluída!`, 'success');
    } else {
      task.status = 'in_progress';
      task.completedAt = null;
      showToast(`Tarefa "${task.title}" reaberta.`, 'info');
    }

    saveToStorage();
    renderAll();
  }

  function saveDrawerTask() {
    const task = state.tasks.find(t => t.id === state.selectedTaskId);
    if (!task) return;

    const newTitle = DOM.drawerTitleInput.value.trim();
    if (!newTitle) {
      showToast('O título não pode ficar vazio.', 'error');
      return;
    }

    task.title = newTitle;
    task.description = DOM.drawerDescTextarea.value.trim();
    task.priority = DOM.drawerFieldPriority.value;
    task.status = DOM.drawerFieldStatus.value;
    task.assignee = DOM.drawerFieldAssignee.value;
    task.dueDate = DOM.drawerFieldDueDate.value;
    task.project = DOM.drawerFieldProject.value;
    task.completed = (task.status === 'completed');

    saveToStorage();
    showToast('Alterações salvas com sucesso!', 'success');
    renderAll();
  }

  function promptDeleteTask(taskId) {
    state.deletingTaskId = taskId;
    DOM.confirmDeleteModal.style.display = 'flex';
  }

  function confirmDelete() {
    if (!state.deletingTaskId) return;
    const taskIdx = state.tasks.findIndex(t => t.id === state.deletingTaskId);
    if (taskIdx > -1) {
      const removed = state.tasks.splice(taskIdx, 1)[0];
      saveToStorage();
      showToast(`Tarefa #${removed.id} removida permanentemente.`, 'info');
      
      // Se era a tarefa selecionada no drawer, reseta para outra
      if (state.selectedTaskId === removed.id && state.tasks.length > 0) {
        state.selectedTaskId = state.tasks[0].id;
      }
    }
    DOM.confirmDeleteModal.style.display = 'none';
    state.deletingTaskId = null;
    renderAll();
  }

  function cancelDelete() {
    DOM.confirmDeleteModal.style.display = 'none';
    state.deletingTaskId = null;
  }

  // 15. SINCRONIZAÇÃO GERAL DE RENDERIZAÇÃO
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

  // 16. REGISTRO DE EVENTOS (EVENT LISTENERS)
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
        if (q === 'today') DOM.modalDueDateText.value = 'Today, Oct 24, 2024';
        else if (q === 'tomorrow') DOM.modalDueDateText.value = 'Tomorrow, Oct 25, 2024';
        else if (q === 'next-week') DOM.modalDueDateText.value = 'Next Week, Oct 31, 2024';
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
        promptDeleteTask(state.selectedTaskId);
      });
    }
    if (DOM.drawerBtnComplete) {
      DOM.drawerBtnComplete.addEventListener('click', () => {
        toggleTaskComplete(state.selectedTaskId);
        renderDrawer();
      });
    }
    if (DOM.btnCopyTaskKey) {
      DOM.btnCopyTaskKey.addEventListener('click', () => {
        navigator.clipboard.writeText(state.selectedTaskId).then(() => {
          showToast(`Chave #${state.selectedTaskId} copiada para a área de transferência!`, 'info');
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
      DOM.btnClearArchive.addEventListener('click', () => {
        const completedCount = state.tasks.filter(t => t.completed).length;
        if (completedCount === 0) {
          showToast('Não há tarefas arquivadas para limpar.', 'info');
          return;
        }
        if (confirm(`Deseja remover as ${completedCount} tarefas concluídas?`)) {
          state.tasks = state.tasks.filter(t => !t.completed);
          saveToStorage();
          showToast('Arquivo de tarefas concluídas limpo!', 'success');
          renderAll();
        }
      });
    }

    // Exportar Audit CSV
    if (DOM.btnExportCSV) {
      DOM.btnExportCSV.addEventListener('click', () => {
        const headers = ['ID', 'Title', 'Project', 'Priority', 'Status', 'Completed', 'Due Date'];
        const rows = state.tasks.map(t => [
          t.id,
          `"${(t.title || '').replace(/"/g, '""')}"`,
          `"${t.project || ''}"`,
          t.priority,
          t.status,
          t.completed ? 'Yes' : 'No',
          `"${t.dueDate || ''}"`
        ]);
        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `taskflow_audit_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Exportação CSV concluída!', 'success');
      });
    }

    // Atalhos Globais de Teclado
    window.addEventListener('keydown', e => {
      // Tecla 'N' para Quick Add quando não estiver focando nenhum input
      if ((e.key === 'n' || e.key === 'N') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        openCreateModal();
        return;
      }
      // ⌘K ou Ctrl+K para foco na busca
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        DOM.topSearchInput.focus();
        return;
      }
      // ESC para fechar Modal
      if (e.key === 'Escape') {
        if (DOM.taskModalOverlay.classList.contains('open')) {
          closeModal();
        }
        if (DOM.confirmDeleteModal.style.display === 'flex') {
          cancelDelete();
        }
      }
      // ⌘+Enter ou Ctrl+Enter dentro do modal para salvar
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        if (DOM.taskModalOverlay.classList.contains('open')) {
          e.preventDefault();
          handleSaveTaskFromModal();
        }
      }
    });
  }

  // 17. INICIALIZAÇÃO DA APLICAÇÃO
  function init() {
    loadFromStorage();
    attachEventListeners();
    switchView('dashboard');
  }

  // Inicializa quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
