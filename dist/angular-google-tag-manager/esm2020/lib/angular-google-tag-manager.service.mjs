import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { GoogleTagManagerConfiguration } from './angular-google-tag-manager-config.service';
import { isPlatformBrowser } from "@angular/common";
import * as i0 from "@angular/core";
import * as i1 from "./angular-google-tag-manager-config.service";
export class GoogleTagManagerService {
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
        }], ctorParameters: function () { return [{ type: i1.GoogleTagManagerConfiguration, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1nb29nbGUtdGFnLW1hbmFnZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZ29vZ2xlLXRhZy1tYW5hZ2VyL3NyYy9saWIvYW5ndWxhci1nb29nbGUtdGFnLW1hbmFnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBVSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRTVGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFLcEQsTUFBTSxPQUFPLHVCQUF1QjtJQWFsQyxZQUdTLDZCQUE0RCxFQUNsQixrQkFBMEIsRUFHcEUsb0JBQTRCLEVBRzVCLHVCQUErQixFQUcvQiw0QkFBb0MsRUFHcEMsd0JBQWdDLEVBRS9CLFVBQWtCO1FBZm5CLGtDQUE2QixHQUE3Qiw2QkFBNkIsQ0FBK0I7UUFDbEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFRO1FBR3BFLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBUTtRQUc1Qiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQVE7UUFHL0IsaUNBQTRCLEdBQTVCLDRCQUE0QixDQUFRO1FBR3BDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBUTtRQUUvQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBOUJwQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLG1CQUFjLEdBQUc7WUFDdkIsU0FBUztnQkFDUCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7WUFDRCxXQUFXO2dCQUNULE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztTQUNGLENBQUM7UUFzQkEsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFLENBQUM7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SSxDQUFDLE1BQU0sQ0FBQztpQkFDckIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM3QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUksQ0FBRSxJQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFFLEVBQUUsQ0FBQztpQkFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNiLENBQUM7SUFDSixDQUFDOztvSEE1SVUsdUJBQXVCLGtCQWV4Qiw2QkFBNkIsNkJBRWpCLG9CQUFvQiw2QkFFaEMsc0JBQXNCLDZCQUd0Qix5QkFBeUIsNkJBR3pCLDhCQUE4Qiw2QkFHOUIsMEJBQTBCLDZCQUUxQixXQUFXO3dIQTlCVix1QkFBdUIsY0FGdEIsTUFBTTsyRkFFUCx1QkFBdUI7a0JBSG5DLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFlSSxRQUFROzswQkFDUixNQUFNOzJCQUFDLDZCQUE2Qjs7MEJBRXBDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsb0JBQW9COzswQkFDdkMsUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQyxzQkFBc0I7OzBCQUU3QixRQUFROzswQkFDUixNQUFNOzJCQUFDLHlCQUF5Qjs7MEJBRWhDLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMsOEJBQThCOzswQkFFckMsUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQywwQkFBMEI7OzBCQUVqQyxNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9uSW5pdCwgT3B0aW9uYWwsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHb29nbGVUYWdNYW5hZ2VyQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vYW5ndWxhci1nb29nbGUtdGFnLW1hbmFnZXItY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgR29vZ2xlVGFnTWFuYWdlckNvbmZpZyB9IGZyb20gJy4vZ29vZ2xlLXRhZy1tYW5hZ2VyLWNvbmZpZyc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdvb2dsZVRhZ01hbmFnZXJTZXJ2aWNlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSBpc0xvYWRlZCA9IGZhbHNlO1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogR29vZ2xlVGFnTWFuYWdlckNvbmZpZyB8IG51bGw7XG5cbiAgcHJpdmF0ZSBicm93c2VyR2xvYmFscyA9IHtcbiAgICB3aW5kb3dSZWYoKTogYW55IHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgZG9jdW1lbnRSZWYoKTogYW55IHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KEdvb2dsZVRhZ01hbmFnZXJDb25maWd1cmF0aW9uKVxuICAgIHB1YmxpYyBnb29nbGVUYWdNYW5hZ2VyQ29uZmlndXJhdGlvbjogR29vZ2xlVGFnTWFuYWdlckNvbmZpZ3VyYXRpb24sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnZ29vZ2xlVGFnTWFuYWdlcklkJykgcHVibGljIGdvb2dsZVRhZ01hbmFnZXJJZDogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdCgnZ29vZ2xlVGFnTWFuYWdlckF1dGgnKVxuICAgIHB1YmxpYyBnb29nbGVUYWdNYW5hZ2VyQXV0aDogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdCgnZ29vZ2xlVGFnTWFuYWdlclByZXZpZXcnKVxuICAgIHB1YmxpYyBnb29nbGVUYWdNYW5hZ2VyUHJldmlldzogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdCgnZ29vZ2xlVGFnTWFuYWdlclJlc291cmNlUGF0aCcpXG4gICAgcHVibGljIGdvb2dsZVRhZ01hbmFnZXJSZXNvdXJjZVBhdGg6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoJ2dvb2dsZVRhZ01hbmFnZXJDU1BOb25jZScpXG4gICAgcHVibGljIGdvb2dsZVRhZ01hbmFnZXJDU1BOb25jZTogc3RyaW5nLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3RcbiAgKSB7XG4gICAgdGhpcy5jb25maWcgPSB0aGlzLmdvb2dsZVRhZ01hbmFnZXJDb25maWd1cmF0aW9uPy5nZXQoKTtcbiAgICBpZiAodGhpcy5jb25maWcgPT0gbnVsbCkge1xuICAgICAgdGhpcy5jb25maWcgPSB7aWQ6IG51bGx9O1xuICAgIH1cblxuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgLi4udGhpcy5jb25maWcsXG4gICAgICBpZDogZ29vZ2xlVGFnTWFuYWdlcklkIHx8IHRoaXMuY29uZmlnLmlkLFxuICAgICAgZ3RtX2F1dGg6IGdvb2dsZVRhZ01hbmFnZXJBdXRoIHx8IHRoaXMuY29uZmlnLmd0bV9hdXRoLFxuICAgICAgZ3RtX3ByZXZpZXc6IGdvb2dsZVRhZ01hbmFnZXJQcmV2aWV3IHx8IHRoaXMuY29uZmlnLmd0bV9wcmV2aWV3LFxuICAgICAgZ3RtX3Jlc291cmNlX3BhdGg6XG4gICAgICAgIGdvb2dsZVRhZ01hbmFnZXJSZXNvdXJjZVBhdGggfHwgdGhpcy5jb25maWcuZ3RtX3Jlc291cmNlX3BhdGgsXG4gICAgfTtcbiAgICBpZiAodGhpcy5jb25maWcuaWQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdHb29nbGUgdGFnIG1hbmFnZXIgSUQgbm90IHByb3ZpZGVkLicpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmJyb3dzZXJHbG9iYWxzID0ge1xuICAgICAgICB3aW5kb3dSZWYoKTogYW55IHtcbiAgICAgICAgICByZXR1cm4gd2luZG93O1xuICAgICAgICB9LFxuICAgICAgICBkb2N1bWVudFJlZigpOiBhbnkge1xuICAgICAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldERhdGFMYXllcigpOiBhbnlbXSB7XG4gICAgY29uc3Qgd2luZG93ID0gdGhpcy5icm93c2VyR2xvYmFscy53aW5kb3dSZWYoKSA/PyB7ZGF0YUxheWVyOiBbXX07XG4gICAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG4gICAgcmV0dXJuIHdpbmRvdy5kYXRhTGF5ZXI7XG4gIH1cblxuICBwcml2YXRlIHB1c2hPbkRhdGFMYXllcihvYmo6IG9iamVjdCk6IHZvaWQge1xuICAgIGNvbnN0IGRhdGFMYXllciA9IHRoaXMuZ2V0RGF0YUxheWVyKCk7XG4gICAgZGF0YUxheWVyLnB1c2gob2JqKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRHdG1Ub0RvbSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNMb2FkZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pc0xvYWRlZCk7XG4gICAgICB9XG4gICAgICBjb25zdCBkb2MgPSB0aGlzLmJyb3dzZXJHbG9iYWxzLmRvY3VtZW50UmVmKCk7XG5cbiAgICAgIGlmIChkb2MgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnB1c2hPbkRhdGFMYXllcih7XG4gICAgICAgICdndG0uc3RhcnQnOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgZXZlbnQ6ICdndG0uanMnLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGd0bVNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIGd0bVNjcmlwdC5pZCA9ICdHVE1zY3JpcHQnO1xuICAgICAgZ3RtU2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICAgIGd0bVNjcmlwdC5zcmMgPSB0aGlzLmFwcGx5R3RtUXVlcnlQYXJhbXMoXG4gICAgICAgIHRoaXMuY29uZmlnLmd0bV9yZXNvdXJjZV9wYXRoXG4gICAgICAgICAgPyB0aGlzLmNvbmZpZy5ndG1fcmVzb3VyY2VfcGF0aFxuICAgICAgICAgIDogJ2h0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL2d0bS5qcydcbiAgICAgICk7XG4gICAgICBndG1TY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoKHRoaXMuaXNMb2FkZWQgPSB0cnVlKSk7XG4gICAgICB9KTtcbiAgICAgIGd0bVNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChmYWxzZSk7XG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLmdvb2dsZVRhZ01hbmFnZXJDU1BOb25jZSkge1xuICAgICAgICBndG1TY3JpcHQuc2V0QXR0cmlidXRlKCdub25jZScsIHRoaXMuZ29vZ2xlVGFnTWFuYWdlckNTUE5vbmNlKTtcbiAgICAgIH1cbiAgICAgIGRvYy5oZWFkLmluc2VydEJlZm9yZShndG1TY3JpcHQsIGRvYy5oZWFkLmZpcnN0Q2hpbGQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHB1c2hUYWcoaXRlbTogb2JqZWN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghdGhpcy5pc0xvYWRlZCkge1xuICAgICAgICB0aGlzLmFkZEd0bVRvRG9tKClcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnB1c2hPbkRhdGFMYXllcihpdGVtKTtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKCkgPT4gcmVqZWN0KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wdXNoT25EYXRhTGF5ZXIoaXRlbSk7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5R3RtUXVlcnlQYXJhbXModXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh1cmwuaW5kZXhPZignPycpID09PSAtMSkge1xuICAgICAgdXJsICs9ICc/JztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgdXJsICtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuY29uZmlnKVxuICAgICAgICAuZmlsdGVyKChrKSA9PiB0aGlzLmNvbmZpZ1trXSlcbiAgICAgICAgLm1hcCgoaykgPT4gYCR7IGsgfT0keyB0aGlzLmNvbmZpZ1trXSB9YClcbiAgICAgICAgLmpvaW4oJyYnKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==