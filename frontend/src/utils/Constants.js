export const LANGUAGES = {
	VI: 'vi',
	EN: 'en',
};

export const PATHS = {
	MAIN: {
		HOME: '/',
		DOCTOR_DETAIL: '/doctor-detail',
	},
	SYSTEM: {
		HOME: '/system',
		LOGIN: '/system/login',
		DASHBOARD: '/system/dashboard',
	},
};

export const DATE_FORMAT = {
	DATETIME: 'YYYY-MM-DD HH:mm:ss',
	STANDARD: 'DD/MM/YYYY',
};

export const SYSTEM_ACTIONS = {
	CREATE: 'CREATE',
	EDIT: 'EDIT',
	DELETE: 'DELETE',
	READ: 'READ',
};

export const SYSTEM_ROLES = {
	ADMIN: 'R1',
	DOCTOR: 'R2',
	PATIENT: 'R2',
};

export const SYSTEM_MENUS = {
	ADMIN: [
		{
			// Dashboard
			name: 'menu.admin.dashboard.name',
			link: PATHS.SYSTEM.DASHBOARD,
		},
		{
			// User management
			name: 'menu.admin.user-management.name',
			menus: [
				{
					name: 'menu.admin.user-management.types.user',
					link: `${PATHS.SYSTEM.HOME}/admin/user-manage`,
					// subMenus: [
					// 	{
					//         name: 'menu.system.system-administrator.user-manage',
					//         link: `${PATHS.SYSTEM.HOME}/admin/user-manage`
					//     },
					// ],
				},
				{
					name: 'menu.admin.user-management.types.doctor',
					link: `${PATHS.SYSTEM.HOME}/admin/doctor-manage`,
				},
				{
					name: 'menu.doctor.user-management.types.schedule',
					link: `${PATHS.SYSTEM.HOME}/admin/doctor-schedule`,
				},
				{
					name: 'menu.admin.user-management.types.admin',
					link: `${PATHS.SYSTEM.HOME}/admin/admin-manage`,
				},
			],
		},
		{
			// Clinic management
			name: 'menu.admin.clinic-management.name',
			menus: [
				{
					name: 'menu.admin.clinic-management.types.clinic',
					link: `${PATHS.SYSTEM.HOME}/admin/clinic-manage`,
				},
			],
		},
		{
			// Specialty management
			name: 'menu.admin.specialty-management.name',
			menus: [
				{
					name: 'menu.admin.specialty-management.types.specialty',
					link: `${PATHS.SYSTEM.HOME}/admin/specialty-manage`,
				},
			],
		},
		{
			// Handbook management
			name: 'menu.admin.handbook-management.name',
			menus: [
				{
					name: 'menu.admin.handbook-management.types.handbook',
					link: `${PATHS.SYSTEM.HOME}/admin/handbook-manage`,
				},
			],
		},
	],
	DOCTOR: [
		{
			// Dashboard
			name: 'menu.admin.dashboard.name',
			link: PATHS.SYSTEM.DASHBOARD,
		},
		{
			// User management
			name: 'menu.doctor.user-management.name',
			menus: [
				{
					name: 'menu.doctor.user-management.types.schedule',
					link: `${PATHS.SYSTEM.HOME}/doctor/doctor-schedule`,
				},
			],
		},
	],
};
