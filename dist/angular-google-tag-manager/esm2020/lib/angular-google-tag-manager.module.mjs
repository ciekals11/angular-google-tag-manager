import { NgModule } from '@angular/core';
import { GoogleTagManagerConfigService } from './angular-google-tag-manager-config.service';
import * as i0 from "@angular/core";
export class GoogleTagManagerModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1nb29nbGUtdGFnLW1hbmFnZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1nb29nbGUtdGFnLW1hbmFnZXIvc3JjL2xpYi9hbmd1bGFyLWdvb2dsZS10YWctbWFuYWdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7O0FBSTVGLE1BQU0sT0FBTyxzQkFBc0I7SUFDMUIsTUFBTSxDQUFDLE9BQU8sQ0FDbkIsTUFBK0I7UUFFL0IsT0FBTztZQUNMLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDO1NBQzFFLENBQUM7SUFDSixDQUFDOzttSEFSVSxzQkFBc0I7b0hBQXRCLHNCQUFzQjtvSEFBdEIsc0JBQXNCOzJGQUF0QixzQkFBc0I7a0JBRGxDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR29vZ2xlVGFnTWFuYWdlckNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2FuZ3VsYXItZ29vZ2xlLXRhZy1tYW5hZ2VyLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IEdvb2dsZVRhZ01hbmFnZXJDb25maWcgfSBmcm9tICcuL2dvb2dsZS10YWctbWFuYWdlci1jb25maWcnO1xuXG5ATmdNb2R1bGUoKVxuZXhwb3J0IGNsYXNzIEdvb2dsZVRhZ01hbmFnZXJNb2R1bGUge1xuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoXG4gICAgY29uZmlnPzogR29vZ2xlVGFnTWFuYWdlckNvbmZpZ1xuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEdvb2dsZVRhZ01hbmFnZXJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEdvb2dsZVRhZ01hbmFnZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEdvb2dsZVRhZ01hbmFnZXJDb25maWdTZXJ2aWNlLCB1c2VWYWx1ZTogY29uZmlnIH1dLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==