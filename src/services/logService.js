// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";

// Keep the interface of logService
function init() {
	// Sentry.init({
	// 	dsn: "https://be44772c8ec64272bc4bbf610ded5073@o1176422.ingest.sentry.io/6274227",
	// 	integrations: [new BrowserTracing()],

	// 	// Set tracesSampleRate to 1.0 to capture 100%
	// 	// of transactions for performance monitoring.
	// 	// We recommend adjusting this value in production
	// 	tracesSampleRate: 1.0,
	// });
}

function log(error) {
	console.error(error)
	// Sentry.captureException(error);
}

export default {
	init,
	log,
};
