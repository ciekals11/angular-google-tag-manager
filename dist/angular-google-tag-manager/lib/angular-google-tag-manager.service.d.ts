import { OnInit } from '@angular/core';
import { GoogleTagManagerConfiguration } from './angular-google-tag-manager-config.service';
import * as i0 from "@angular/core";
export declare class GoogleTagManagerService implements OnInit {
    googleTagManagerConfiguration: GoogleTagManagerConfiguration;
    googleTagManagerId: string;
    googleTagManagerAuth: string;
    googleTagManagerPreview: string;
    googleTagManagerResourcePath: string;
    googleTagManagerCSPNonce: string;
    private platformId;
    private isLoaded;
    private readonly config;
    private browserGlobals;
    constructor(googleTagManagerConfiguration: GoogleTagManagerConfiguration, googleTagManagerId: string, googleTagManagerAuth: string, googleTagManagerPreview: string, googleTagManagerResourcePath: string, googleTagManagerCSPNonce: string, platformId: Object);
    ngOnInit(): void;
    getDataLayer(): any[];
    private pushOnDataLayer;
    addGtmToDom(): Promise<boolean>;
    pushTag(item: object): Promise<void>;
    private applyGtmQueryParams;
    static ɵfac: i0.ɵɵFactoryDeclaration<GoogleTagManagerService, [{ optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GoogleTagManagerService>;
}
