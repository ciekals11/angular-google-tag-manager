import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Optional, Inject, PLATFORM_ID, NgModule } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const GoogleTagManagerConfigService = new InjectionToken('google-tag-manager-config');
// adapted from https://github.com/auth0/auth0-angular#dynamic-configuration
class GoogleTagManagerConfiguration {
    constructor(googleTagManagerConfig) {
        this._googleTagManagerConfig = {
            id: null,
            gtm_auth: '',
            gtm_preview: '',
        };
        if (googleTagManagerConfig) {
            this.set(googleTagManagerConfig);
        }
    }
    set(googleTagManagerConfig) {
        this._googleTagManagerConfig = googleTagManagerConfig;
    }
    get() {
        return this._googleTagManagerConfig;
    }
}
GoogleTagManagerConfiguration.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GoogleTagManagerConfiguration, deps: [{ token: GoogleTagManagerConfigService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
GoogleTagManagerConfiguration.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GoogleTagManagerConfiguration, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GoogleTagManagerConfiguration, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [GoogleTagManagerConfigService]
                }] }]; } });

class GoogleTagManagerService {
    constructor(googleTagManagerConfiguration, googleTagManagerId, googleTagManagerAuth, googleTagManagerPreview, googleTagManagerResourcePath, googleTagManagerCSPNonce, platformId) {
        this.googleTagManagerConfiguration = googleTagManagerConfiguration;
        this.googleTagManagerId = googleTagManagerId;
        this.googleTagManagerAuth = googleTagManagerAuth;
        this.googleTagManagerPreview = googleTagManagerPreview;
        this.googleTagManagerResourcePath = googleTagManagerResourcePath;
        this.googleTagManagerCSPNonce = googleTagManagerCSPNonce;
        this.platformId = platformId;
        this.isLoaded = false;
        this.browserGlobals = {
            windowRef() {
                return null;
            },
            documentRef() {
                return null;
            },
        };
        this.config = this.googleTagManagerConfiguration?.get();
        if (this.config == null) {
            this.config = { id: null };
        }
        this.config = {
            ...this.config,
            id: googleTagManagerId || this.config.id,
            gtm_auth: googleTagManagerAuth || this.config.gtm_auth,
            gtm_preview: googleTagManagerPreview || this.config.gtm_preview,
            gtm_resource_path: googleTagManagerResourcePath || this.config.gtm_resource_path,
        };
        if (this.config.id == null) {
            throw new Error('Google tag manager ID not provided.');
        }
    }
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.browserGlobals = {
                windowRef() {
                    return window;
                },
                documentRef() {
                    return document;
                },
            };
        }
    }
    getDataLayer() {
        const window = this.browserGlobals.windowRef() ?? { dataLayer: [] };
        window.dataLayer = window.dataLayer || [];
        return window.dataLayer;
    }
    pushOnDataLayer(obj) {
        const dataLayer = this.getDataLayer();
        dataLayer.push(obj);
    }
    addGtmToDom() {
        return new Promise((resolve, reject) => {
            if (this.isLoaded) {
                return resolve(this.isLoaded);
            }
            const doc = this.browserGlobals.documentRef();
            if (doc === null) {
                return resolve(false);
            }
            this.pushOnDataLayer({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js',
            });
            const gtmScript = doc.createElement('script');
            gtmScript.id = 'GTMscript';
            gtmScript.async = true;
            gtmScript.src = this.applyGtmQueryParams(this.config.gtm_resource_path
                ? this.config.gtm_resource_path
                : 'https://www.googletagmanager.com/gtm.js');
            gtmScript.addEventListener('load', () => {
                return resolve((this.isLoaded = true));
            });
            gtmScript.addEventListener('error', () => {
                return reject(false);
            });
            if (this.googleTagManagerCSPNonce) {
                gtmScript.setAttribute('nonce', this.googleTagManagerCSPNonce);
            }
            doc.head.insertBefore(gtmScript, doc.head.firstChild);
        });
    }
    pushTag(item) {
        return new Promise((resolve, reject) => {
            if (!this.isLoaded) {
                this.addGtmToDom()
                    .then(() => {
                    this.pushOnDataLayer(item);
                    return resolve();
                })
                    .catch(() => reject());
            }
            else {
                this.pushOnDataLayer(item);
                return resolve();
            }
        });
    }
    applyGtmQueryParams(url) {
        if (url.indexOf('?') === -1) {
            url += '?';
        }
        return (url +
            Object.keys(this.config)
                .filter((k) => this.config[k])
                .map((k) => `${k}=${this.config[k]}`)
                .join('&'));
    }
}
GoogleTagManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GoogleTagManagerService, deps: [{ token: GoogleTagManagerConfiguration, optional: true }, { token: 'googleTagManagerId', optional: true }, { token: 'googleTagManagerAuth', optional: true }, { token: 'googleTagManagerPreview', optional: true }, { token: 'googleTagManagerResourcePath', optional: true }, { token: 'googleTagManagerCSPNonce', optional: true }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
GoogleTagManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GoogleTagManagerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GoogleTagManagerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: GoogleTagManagerConfiguration, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [GoogleTagManagerConfiguration]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['googleTagManagerId']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['googleTagManagerAuth']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['googleTagManagerPreview']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['googleTagManagerResourcePath']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['googleTagManagerCSPNonce']
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });

class GoogleTagManagerModule {
    static forRoot(config) {
        return {
            ngModule: GoogleTagManagerModule,
            providers: [{ provide: GoogleTagManagerConfigService, useValue: config }],
        };
    }
}
GoogleTagManagerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GoogleTagManagerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GoogleTagManagerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.2", ngImport: i0, type: GoogleTagManagerModule });
GoogleTagManagerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GoogleTagManagerModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GoogleTagManagerModule, decorators: [{
            type: NgModule
        }] });

/*
 * Public API Surface of angular-google-tag-manager
 */

/**
 * Generated bundle index. Do not edit.
 */

export { GoogleTagManagerModule, GoogleTagManagerService };
//# sourceMappingURL=angular-google-tag-manager.mjs.map
