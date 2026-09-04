/* src/utils/adminScripts.js */
// Utility functions extracted from analytics.html and clients.html scripts.
// All functions operate on DOM elements by ID, preserving Tailwind classes and animations.

// Theme toggle
export function toggleTheme() {
  const html = document.documentElement;
  const themeIcon = document.getElementById('themeIcon');
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    themeIcon.setAttribute('data-lucide', 'sun');
  } else {
    html.classList.add('dark');
    themeIcon.setAttribute('data-lucide', 'moon');
  }
  if (window.lucide) window.lucide.createIcons();
}

// Notification panel toggle
export function toggleNotifications() {
  const panel = document.getElementById('notificationPanel');
  if (panel) panel.classList.toggle('hidden');
}

// Refresh data (placeholder)
export function refreshData() {
  const icon = document.getElementById('refreshIcon');
  if (icon) {
    icon.classList.add('rotate-180');
    setTimeout(() => {
      icon.classList.remove('rotate-180');
      const txt = document.getElementById('lastUpdatedText');
      if (txt) txt.textContent = 'Just now';
    }, 500);
  }
}

// View‑state helper
export function setViewState(state) {
  const states = ['data', 'loading', 'empty', 'error'];
  states.forEach(s => {
    const container = document.getElementById(`view-${s}-container`);
    const btn = document.getElementById(`btn-state-${s}`);
    if (container) {
      container.classList.toggle('hidden', s !== state);
    }
    if (btn) {
      btn.className = s === state
        ? "px-2.5 py-1.5 rounded-lg bg-accent-primary text-white font-semibold shadow-xs transition-all duration-200"
        : "px-2.5 py-1.5 rounded-lg text-text-muted hover:text-text-main transition-colors duration-200";
    }
  });
}

// Revenue chart tooltip
export function showChartTooltip(e, date, rev, paid) {
  const tooltip = document.getElementById('chartTooltip');
  if (!tooltip) return;
  document.getElementById('tooltipDate').textContent = date;
  document.getElementById('tooltipRev').textContent = `Revenue: ${rev}`;
  document.getElementById('tooltipPaid').textContent = `Paid bookings: ${paid}`;
  tooltip.classList.remove('hidden');
  tooltip.style.left = `${e.layerX - 50}px`;
  tooltip.style.top = `${e.layerY - 80}px`;
  setTimeout(() => {
    const hide = () => {
      tooltip.classList.add('hidden');
      document.removeEventListener('click', hide);
    };
    document.addEventListener('click', hide);
  }, 100);
}

// Client‑growth chart interactions
export function handleGrowthMouseMove(e) {
  const svg = document.getElementById('clientGrowthSvg');
  const crosshair = document.getElementById('growthCrosshair');
  if (!svg || !crosshair) return;
  const rect = svg.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const svgX = (mouseX / rect.width) * 500; // viewBox width
  crosshair.setAttribute('x1', svgX);
  crosshair.setAttribute('x2', svgX);
  crosshair.style.opacity = '0.75';
}

export function handleGrowthMouseLeave() {
  const crosshair = document.getElementById('growthCrosshair');
  if (crosshair) crosshair.style.opacity = '0';
}

export function showGrowthTooltip(e, date, newCount, totalActive) {
  const tooltip = document.getElementById('growthTooltip');
  if (!tooltip) return;
  document.getElementById('growthTooltipDate').textContent = date;
  document.getElementById('growthTooltipNew').textContent = `Acquisitions: ${newCount}`;
  document.getElementById('growthTooltipTotal').textContent = `Total: ${totalActive}`;
  tooltip.classList.remove('hidden');
  tooltip.style.left = `${e.layerX - 45}px`;
  tooltip.style.top = `${e.layerY - 75}px`;
  setTimeout(() => {
    const hide = () => {
      tooltip.classList.add('hidden');
      document.removeEventListener('click', hide);
    };
    document.addEventListener('click', hide);
  }, 100);
}

// Export menu
export function toggleExportMenu() {
  const menu = document.getElementById('exportDropdown');
  if (menu) menu.classList.toggle('hidden');
}

export function handleExport(format) {
  toggleExportMenu();
  alert(`[Prototype] Exporting YogaPT Analytics Report as ${format}...`);
}

/* ---------- CLIENTS PAGE LOGIC ---------- */

export const clientsData = [
  {
    id: "CL-1024",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43210",
    joined: "12 Aug 2026",
    joinedTimestamp: new Date("2026-08-12").getTime(),
    bookingsCount: 18,
    lastActivity: "27 Aug 2026",
    lastActivityTimestamp: new Date("2026-08-27").getTime(),
    status: "Active",
    spent: "₹6,000",
    upcoming: [
      { name: "Morning Flow", date: "28 Aug", time: "07:00 AM", status: "Confirmed", price: "₹500" },
      { name: "Power Yoga", date: "30 Aug", time: "05:30 PM", status: "Confirmed", price: "₹650" }
    ],
    activity: [
      { date: "27 Aug", desc: "Booked Morning Flow" },
      { date: "26 Aug", desc: "Attended Hatha Yoga" },
      { date: "24 Aug", desc: "Booked Evening Relaxation" },
      { date: "20 Aug", desc: "Completed Power Yoga" }
    ]
  },
  // Additional client objects can be added here as needed
];

let currentActiveClientId = null;
let selectedClientIdForToggle = null;

export function renderClients(dataToRender) {
  const tbody = document.getElementById('clientTableBody');
  const emptyState = document.getElementById('emptyState');
  tbody.innerHTML = '';
  if (dataToRender.length === 0) {
    emptyState.classList.remove('hidden');
    document.getElementById('paginationInfo').textContent = `Showing 0 of 0 clients`;
    return;
  } else {
    emptyState.classList.add('hidden');
  }
  dataToRender.forEach(client => {
    const initials = client.name.split(' ').map(n => n[0]).join('');
    const statusBadge = client.status === 'Active'
      ? `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[11px]"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ACTIVE</span>`
      : `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-500/10 text-text-muted font-bold text-[11px]"><span class="w-1.5 h-1.5 rounded-full bg-slate-500"></span> INACTIVE</span>`;
    const row = document.createElement('tr');
    row.className = 'border-b border-border-color hover:bg-bg-main/60 transition-colors cursor-pointer group';
    row.onclick = e => {
      if (!e.target.closest('.action-menu-container')) {
        openClientDrawer(client.id);
      }
    };
    row.innerHTML = `
      <td class="py-4 px-6 flex items-center gap-3">
        <div class="w-9 h-9 rounded-full bg-accent-primary/10 text-accent-primary font-bold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">${initials}</div>
        <div>
          <span class="font-bold text-text-main block">${client.name}</span>
          <span class="text-[10px] font-mono text-text-muted">${client.id}</span>
        </div>
      </td>
      <td class="py-4 px-6 text-text-muted">${client.email}</td>
      <td class="py-4 px-6 text-text-muted">${client.phone}</td>
      <td class="py-4 px-6 text-text-muted">${client.joined}</td>
      <td class="py-4 px-6 font-semibold text-text-main">${client.bookingsCount} bookings</td>
      <td class="py-4 px-6 text-text-muted">${client.lastActivity}</td>
      <td class="py-4 px-6">${statusBadge}</td>
      <td class="py-4 px-6 text-right relative action-menu-container">
        <div class="relative inline-block text-left">
          <button onclick="toggleActionMenu('${client.id}', event)" class="p-2 rounded-xl text-text-muted hover:text-text-main hover:bg-bg-surface transition-all"><i data-lucide="more-horizontal" class="w-4 h-4"></i></button>
          <div id="actionMenu-${client.id}" class="hidden absolute right-0 mt-2 w-48 app-card p-1.5 shadow-2xl z-40 text-left space-y-0.5">
            <button onclick="openClientDrawer('${client.id}')" class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-text-main hover:bg-bg-main transition-colors"><i data-lucide="user" class="w-3.5 h-3.5"></i> View Profile</button>
            <button onclick="goToBookingsPageWithClient('${client.id}')" class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-text-main hover:bg-bg-main transition-colors"><i data-lucide="calendar-check" class="w-3.5 h-3.5"></i> View Bookings</button>
            <button onclick="openEditModal('${client.id}')" class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-text-main hover:bg-bg-main transition-colors"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Edit Client</button>
            <div class="my-1 border-t border-border-color"></div>
            ${client.status === 'Active'
              ? `<button onclick="promptStatusToggle('${client.id}')" class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors font-medium"><i data-lucide="user-x" class="w-3.5 h-3.5"></i> Deactivate Client</button>`
              : `<button onclick="promptStatusToggle('${client.id}')" class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-colors font-medium"><i data-lucide="user-check" class="w-3.5 h-3.5"></i> Activate Client</button>`}
          </div>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
  document.getElementById('paginationInfo').textContent = `Showing 1–${dataToRender.length} of ${clientsData.length} clients`;
  if (window.lucide) window.lucide.createIcons();
}

export function toggleActionMenu(clientId, event) {
  event.stopPropagation();
  document.querySelectorAll('[id^="actionMenu-"]').forEach(menu => {
    if (menu.id !== `actionMenu-${clientId}`) menu.classList.add('hidden');
  });
  const menu = document.getElementById(`actionMenu-${clientId}`);
  if (menu) menu.classList.toggle('hidden');
}

export function applyFilters() {
  const searchTerm = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const statusVal = document.getElementById('statusFilter')?.value || 'all';
  const activityVal = document.getElementById('activityFilter')?.value || 'all';
  const bookingVal = document.getElementById('bookingFilter')?.value || 'all';
  const sortVal = document.getElementById('sortBy')?.value || 'name';
  let filtered = clientsData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm) ||
      client.phone.toLowerCase().includes(searchTerm) ||
      client.id.toLowerCase().includes(searchTerm);
    if (!matchesSearch) return false;
    if (statusVal === 'active' && client.status !== 'Active') return false;
    if (statusVal === 'inactive' && client.status !== 'Inactive') return false;
    if (activityVal === 'recent' && client.lastActivityTimestamp < Date.now() - 7 * 24 * 60 * 60 * 1000) return false;
    if (activityVal === 'none' && client.lastActivityTimestamp >= Date.now() - 7 * 24 * 60 * 60 * 1000) return false;
    if (bookingVal === 'upcoming' && client.upcoming.length === 0) return false;
    if (bookingVal === 'none' && client.upcoming.length > 0) return false;
    return true;
  });
  filtered.sort((a, b) => {
    switch (sortVal) {
      case 'name': return a.name.localeCompare(b.name);
      case 'newest': return b.joinedTimestamp - a.joinedTimestamp;
      case 'oldest': return a.joinedTimestamp - b.joinedTimestamp;
      case 'bookings': return b.bookingsCount - a.bookingsCount;
      case 'activity': return b.lastActivityTimestamp - a.lastActivityTimestamp;
      default: return 0;
    }
  });
  renderClients(filtered);
}

export function resetAllFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('statusFilter').value = 'all';
  document.getElementById('activityFilter').value = 'all';
  document.getElementById('bookingFilter').value = 'all';
  document.getElementById('sortBy').value = 'name';
  applyFilters();
}

export function openClientDrawer(clientId) {
  const drawer = document.getElementById('clientDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (!drawer || !overlay) return;
  const client = clientsData.find(c => c.id === clientId);
  if (!client) return;
  currentActiveClientId = clientId;
  document.getElementById('drawerAvatarInitials').textContent = client.name.split(' ').map(n => n[0]).join('');
  document.getElementById('drawerClientName').textContent = client.name;
  document.getElementById('drawerClientId').textContent = `#${client.id}`;
  document.getElementById('drawerStatusBadge').textContent = client.status.toUpperCase();
  document.getElementById('drawerEmail').textContent = client.email;
  document.getElementById('drawerPhone').textContent = client.phone;
  document.getElementById('drawerJoined').textContent = client.joined;
  document.getElementById('drawerLastActive').textContent = client.lastActivity;
  document.getElementById('drawerTotalBookings').textContent = client.bookingsCount;
  document.getElementById('drawerUpcomingBookings').textContent = client.upcoming.length;
  document.getElementById('drawerCompletedBookings').textContent = client.bookingsCount - client.upcoming.length;
  document.getElementById('drawerTotalSpent').textContent = client.spent;
  const upcomingContainer = document.getElementById('drawerUpcomingList');
  upcomingContainer.innerHTML = '';
  client.upcoming.forEach(b => {
    const div = document.createElement('div');
    div.className = 'flex items-center justify-between py-2 border-b border-border-color';
    div.innerHTML = `<span>${b.date} – ${b.name}</span><span class="font-medium">${b.price}</span>`;
    upcomingContainer.appendChild(div);
  });
  const timeline = document.getElementById('drawerActivityTimeline');
  timeline.innerHTML = '';
  client.activity.forEach(act => {
    const div = document.createElement('div');
    div.className = 'flex items-start gap-2';
    div.innerHTML = `<span class="w-2 h-2 rounded-full bg-accent-primary mt-1"></span><div><span class="font-medium">${act.date}</span> – ${act.desc}</div>`;
    timeline.appendChild(div);
  });
  drawer.classList.remove('translate-x-full');
  overlay.classList.remove('hidden');
  overlay.classList.add('opacity-100');
}

export function closeClientDrawer() {
  const drawer = document.getElementById('clientDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (!drawer || !overlay) return;
  drawer.classList.add('translate-x-full');
  overlay.classList.add('hidden');
  overlay.classList.remove('opacity-100');
}

export function openEditModal(clientId) {
  const modal = document.getElementById('editModal');
  if (!modal) return;
  const client = clientsData.find(c => c.id === clientId);
  if (!client) return;
  document.getElementById('editClientId').value = client.id;
  document.getElementById('editNameInput').value = client.name;
  document.getElementById('editEmailInput').value = client.email;
  document.getElementById('editPhoneInput').value = client.phone;
  modal.classList.remove('hidden');
  modal.classList.add('opacity-100');
}

export function closeEditModal() {
  const modal = document.getElementById('editModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('opacity-100');
}

export function saveClientChanges() {
  const id = document.getElementById('editClientId').value;
  const client = clientsData.find(c => c.id === id);
  if (!client) return;
  client.name = document.getElementById('editNameInput').value;
  client.email = document.getElementById('editEmailInput').value;
  client.phone = document.getElementById('editPhoneInput').value;
  if (currentActiveClientId === id) openClientDrawer(id);
  applyFilters();
  closeEditModal();
  showToast('Client details updated');
}

export function promptStatusToggle(clientId) {
  selectedClientIdForToggle = clientId;
  const client = clientsData.find(c => c.id === clientId);
  const title = document.getElementById('confirmTitle');
  const message = document.getElementById('confirmMessage');
  const iconBox = document.getElementById('confirmIconBox');
  const actionBtn = document.getElementById('confirmActionBtn');
  if (!title || !message || !iconBox || !actionBtn) return;
  if (client.status === 'Active') {
    title.textContent = 'Deactivate Account?';
    message.textContent = 'The client will no longer be able to log in or book sessions. Historical records remain intact.';
    iconBox.innerHTML = '<i data-lucide="alert-triangle" class="w-5 h-5"></i>';
    actionBtn.textContent = 'Deactivate';
    actionBtn.className = 'px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-sm';
  } else {
    title.textContent = 'Activate Account?';
    message.textContent = 'The client will regain access to the portal and be able to book sessions.';
    iconBox.innerHTML = '<i data-lucide="check-circle-2" class="w-5 h-5"></i>';
    actionBtn.textContent = 'Activate';
    actionBtn.className = 'px-4 py-2.5 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-all shadow-sm';
  }
  openConfirmModal();
}

export function executeStatusToggle() {
  const client = clientsData.find(c => c.id === selectedClientIdForToggle);
  if (!client) return;
  client.status = client.status === 'Active' ? 'Inactive' : 'Active';
  applyFilters();
  closeConfirmModal();
  showToast(`Client ${client.status === 'Active' ? 'activated' : 'deactivated'}`);
}

export function openConfirmModal() {
  const modal = document.getElementById('confirmModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('opacity-100');
  if (window.lucide) window.lucide.createIcons();
}

export function closeConfirmModal() {
  const modal = document.getElementById('confirmModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('opacity-100');
}

export function showToast(message) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toastMessage');
  if (!toast || !msg) return;
  msg.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3000);
}

export function goToBookingsPage() {
  alert('Navigate to bookings overview (not implemented)');
}
export function goToBookingsPageWithClient(clientId) {
  alert(`Navigate to bookings for ${clientId} (not implemented)`);
}

export function initIcons() {
  if (window.lucide) window.lucide.createIcons();
}

