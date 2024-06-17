var klaroConfig = {
    acceptAll: true,
    services: [
        {
            name: 'google-tag-manager',
            required: true,
            purposes: ['marketing'],
            onAccept: `
                // we notify the tag manager about all services that were accepted. You can define
                // a custom event in GTM to load the service if consent was given.
                for(let k of Object.keys(opts.consents)){
                    if (opts.consents[k]){
                        let eventName = 'klaro-'+k+'-accepted'
                        dataLayer.push({'event': eventName})
                    }
                }
            `,
            onInit: `
                // initialization code here (will be executed only once per page-load)
                window.dataLayer = window.dataLayer || [];
                window.gtag = function(){dataLayer.push(arguments)}
                gtag('consent', 'default', {'ad_storage': 'denied', 'analytics_storage': 'denied', 'ad_user_data': 'denied', 'ad_personalization': 'denied'})
                gtag('set', 'ads_data_redaction', true)
            `,
            translations: {
                en: {
                    description: 'Google Tag Manager is a free tool for managing and deploying marketing tags on your website or app without direct code changes'
                },
            },
        },
        {
            // In GTM, you should define a custom event trigger named `klaro-google-analytics-accepted` which should trigger the Google Analytics integration.
            name: 'google-analytics',
            required: true,
            cookies: [
                /^_ga(_.*)?/ // we delete the Google Analytics cookies if the user declines its use
            ],
            purposes: ['analytics'],
            onAccept: `
                // we grant analytics storage
                gtag('consent', 'update', {
                    'analytics_storage': 'granted',
                })
            `,
            onDecline: `
                // we deny analytics storage
                gtag('consent', 'update', {
                    'analytics_storage': 'denied',
                })
            `,
            translations: {
                en: {
                    description: 'Google Analytics is a free tool for tracking and analyzing website traffic and user behavior'
                },
            },
        },
        {
            // In GTM, you should define a custom event trigger named `klaro-clarity-accepted` which should trigger the Google Analytics integration.
            name: 'microsoft-clarity',
            required: false,
            cookies: [
                /^_ga(_.*)?/ // we delete the Google Analytics cookies if the user declines its use
            ],
            purposes: ['analytics'],
            onAccept: `
                // we grant analytics storage
                gtag('consent', 'update', {
                    'analytics_storage': 'granted',
                })
            `,
            onDecline: `
                // we deny analytics storage
                gtag('consent', 'update', {
                    'analytics_storage': 'denied',
                })
            `,
            translations: {
                en: {
                    description: 'Clarity is a free user behavior analytics tool that helps you understand how users are interacting with your website through session replays and heatmaps'
                },
            },
        },
        {
            // In GTM, you should define a custom event trigger named `klaro-webpusher-accepted` which should trigger the Google Analytics integration.
            name: 'webpusher',
            required: false,
            purposes: ['marketing'],
            onAccept: `
                // we notify the tag manager about all services that were accepted. You can define
                // a custom event in GTM to load the service if consent was given.
                for(let k of Object.keys(opts.consents)){
                    if (opts.consents[k]){
                        let eventName = 'klaro-'+k+'-accepted'
                        dataLayer.push({'event': eventName})
                    }
                }
            `,
            onInit: `
                // initialization code here (will be executed only once per page-load)
                window.dataLayer = window.dataLayer || [];
                window.gtag = function(){dataLayer.push(arguments)}
                gtag('consent', 'default', {'ad_storage': 'denied', 'analytics_storage': 'denied', 'ad_user_data': 'denied', 'ad_personalization': 'denied'})
                gtag('set', 'ads_data_redaction', true)
            `,
            translations: {
                en: {
                    description: 'Webpushr is a web push notifications platform that marketers love & developers rely on'
                },
            },
        },
    ],
    purposes: {
                analytics: {
                    title: 'Analytics'
                },
                security: {
                    title: 'Security'
                },
                livechat: {
                    title: 'Livechat'
                },
                advertising: {
                    title: 'Advertising'
                },
                styling: {
                    title: 'Styling'
                },
    },
}