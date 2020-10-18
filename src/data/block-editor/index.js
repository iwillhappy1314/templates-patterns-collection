/**
 * WordPress dependencies
 */
const { registerStore } = wp.data;

const DEFAULT_STATE = {
	isFetching: true,
	isPreview: false,
	tab: 'library',
	templates: [],
	patterns: [],
	library: {
		items: [],
		currentPage: 0,
		totalPages: 0
	},
	preview: {
		type: 'templates',
		item: {}
	}
};

registerStore( 'tpc/block-editor', {
	reducer( state = DEFAULT_STATE, action ) {
		if ( 'SET_FETCHING' === action.type ) {
			return {
				...state,
				isFetching: action.isFetching
			};
		}

		if ( 'TOGGLE_PREVIEW' === action.type ) {
			return {
				...state,
				isPreview: ! state.isPreview
			};
		}

		if ( 'UPDATE_CURRENT_TAB' === action.type ) {
			if ( state.isPreview ) {
				return state;
			}

			return {
				...state,
				tab: action.tab
			};
		}

		if ( 'UPDATE_TEMPLATES' === action.type ) {
			return {
				...state,
				templates: action.items
			};
		}

		if ( 'UPDATE_PATTERNS' === action.type ) {
			return {
				...state,
				patterns: action.items
			};
		}

		if ( 'UPDATE_LIBRARY' === action.type ) {
			return {
				...state,
				library: {
					items: action.items,
					currentPage: Number( action.currentPage ),
					totalPages: Number( action.totalPages )
				}
			};
		}

		if ( 'SET_PREVIEW_DATA' === action.type ) {
			return {
				...state,
				preview: action.preview
			};
		}

		return state;
	},

	selectors: {
		isFetching( state ) {
			return state.isFetching;
		},

		isPreview( state ) {
			return state.isPreview;
		},

		getCurrentTab( state ) {
			return state.tab;
		},

		getTemplates( state ) {
			return state.templates;
		},

		getPatterns( state ) {
			return state.patterns;
		},

		getLibrary( state ) {
			return state.library;
		},

		getPreview( state ) {
			return state.preview;
		}
	},

	actions: {
		setFetching( isFetching ) {
			return {
				type: 'SET_FETCHING',
				isFetching
			};
		},

		togglePreview( isPreview ) {
			return {
				type: 'TOGGLE_PREVIEW',
				isPreview
			};
		},

		updateCurrentTab( tab ) {
			return {
				type: 'UPDATE_CURRENT_TAB',
				tab
			};
		},

		updateTemplates( items ) {
			return {
				type: 'UPDATE_TEMPLATES',
				items
			};
		},

		updatePatterns( items ) {
			return {
				type: 'UPDATE_PATTERNS',
				items
			};
		},

		updateLibrary( items, currentPage, totalPages ) {
			return {
				type: 'UPDATE_LIBRARY',
				items,
				currentPage,
				totalPages
			};
		},

		setPreviewData( preview ) {
			return {
				type: 'SET_PREVIEW_DATA',
				preview
			};
		}
	}
});
