import {CedarUIComponent} from '../models/ui/cedar-ui-component.model';
import {CedarComponent} from '../models/component/cedar-component.model';
import {SingleFieldComponent} from '../models/field/single-field-component.model';
import {JsonSchema} from '../models/json-schema.model';
import {MultiFieldComponent} from '../models/field/multi-field-component.model';
import {SingleElementComponent} from '../models/element/single-element-component.model';
import {MultiElementComponent} from '../models/element/multi-element-component.model';
import {Injectable} from '@angular/core';
import {CedarMultiPagerComponent} from '../components/cedar-multi-pager/cedar-multi-pager.component';
import {MultiInstanceObjectInfo} from '../models/info/multi-instance-object-info.model';
import {HandlerContext} from '../util/handler-context';
import {InputType} from '../models/input-type.model';

@Injectable({
  providedIn: 'root'
})
export class ActiveComponentRegistryService {

  private modelToUI: Map<CedarComponent, CedarUIComponent> = new Map<CedarComponent, CedarUIComponent>();
  private modelToMultiPagerUI: Map<CedarComponent, CedarMultiPagerComponent> = new Map<CedarComponent, CedarMultiPagerComponent>();

  private getUIComponent(component: CedarComponent): CedarUIComponent {
    return this.modelToUI.get(component);
  }

  private getMultiPagerUI(component: CedarComponent): CedarMultiPagerComponent {
    return this.modelToMultiPagerUI.get(component);
  }

  updateViewToModel(component: CedarComponent, handlerContext: HandlerContext): void {
    if (component instanceof SingleFieldComponent) {
      const dataObject: object = handlerContext.getDataObjectNodeByPath(component.path);
      const uiComponent: CedarUIComponent = this.getUIComponent(component);
      if (uiComponent != null && dataObject != null) {
        uiComponent.setCurrentValue(dataObject[JsonSchema.atValue]);
      }
    } else if (component instanceof MultiFieldComponent) {
      const dataObject: object = handlerContext.getDataObjectNodeByPath(component.path);
      const parentDataObject = handlerContext.getParentDataObjectNodeByPath(component.path);
      const uiComponent: CedarUIComponent = this.getUIComponent(component);

      if (uiComponent != null) {
        const multiInstanceInfo: MultiInstanceObjectInfo = handlerContext.multiInstanceObjectService.getMultiInstanceInfoForComponent(component);



        // console.log('active-component-registry ***********************************');
        // console.log('uiComponent');
        // console.log(uiComponent);
        // console.log('dataObject');
        // console.log(JSON.parse(JSON.stringify(dataObject)));
        // console.log('parentDataObject');
        // console.log(JSON.parse(JSON.stringify(parentDataObject)));
        // console.log('currentIndex');
        // console.log(multiInstanceInfo.currentIndex);
        // console.log('end active-component-registry *******************************');




        // if (!component.isMultiPage()) {
        //
        //   console.log('I am not multipage!!!');
        //
        // } else
        if (dataObject[multiInstanceInfo.currentIndex] != null) {



          if (component.basicInfo.inputType === InputType.attributeValue) {
            let key = dataObject[multiInstanceInfo.currentIndex];

            if (key instanceof Object && key.hasOwnProperty(JsonSchema.atValue) && key[JsonSchema.atValue] === null) {
              handlerContext.changeAttributeValue(component, null, null);
            } else if (multiInstanceInfo.currentIndex > 0) {
              const cloneSourceKey = dataObject[multiInstanceInfo.currentIndex - 1];

              if (key === cloneSourceKey) {
                const val = parentDataObject[cloneSourceKey][JsonSchema.atValue];
                handlerContext.changeAttributeValue(component, null, val);
              }
            }

            key = dataObject[multiInstanceInfo.currentIndex];
            const value = parentDataObject[key][JsonSchema.atValue];
            const obj = {};
            obj[key] = value;
            uiComponent.setCurrentValue(obj);
          } else {
            uiComponent.setCurrentValue(dataObject[multiInstanceInfo.currentIndex][JsonSchema.atValue]);
          }



        }

        const uiPager = this.getMultiPagerUI(component);

        // console.log('uiPager');
        // console.log(uiPager);

        uiPager.updatePagingUI();
      }
    } else if (component instanceof SingleElementComponent) {
      for (const childComponent of component.children) {
        this.updateViewToModel(childComponent, handlerContext);
      }
    } else if (component instanceof MultiElementComponent) {
      const uiPager = this.getMultiPagerUI(component);
      uiPager.updatePagingUI();
      for (const childComponent of component.children) {
        this.updateViewToModel(childComponent, handlerContext);
      }
    }
  }

  deleteCurrentValue(component: CedarComponent): void {
    const uiComponent: CedarUIComponent = this.getUIComponent(component);

    if (uiComponent) {
      uiComponent.deleteCurrentValue();
    }
  }

  registerComponent(modelComponent: CedarComponent, uiComponent: CedarUIComponent): void {
    this.modelToUI.set(modelComponent, uiComponent);
  }

  registerMultiPagerComponent(modelComponent: CedarComponent, uiComponent: CedarMultiPagerComponent): void {
    this.modelToMultiPagerUI.set(modelComponent, uiComponent);
  }
}
