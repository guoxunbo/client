import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';

import HeaderAsideFooterResponsiveLayout from '@layouts/HeaderAsideFooterResponsiveLayout';
import BlankLayout from '@layouts/BlankLayout';

// framework
import EntityProperties from '@properties/framework/EntityProperties';
import EntityHistoryProperties from '@properties/framework/EntityHistoryProperties';
import EntityScanProperties from '@properties/framework/EntityScanProperties';
import EntityDoubleScanProperties from '@properties/framework/EntityDoubleScanProperties';
import EntityScanCheckProperties from '@properties/framework/EntityScanCheckProperties';
import EntityViewProperties from '@properties/framework/EntityViewProperties';
import GeneratorRuleProperties from '@properties/idgenerator/GeneratorRuleProperties';

//security
import UserProperties from '@properties/security/UserProperties';
import RoleProperties from '@properties/security/RoleProperties';

//kms
import QuestionProperties from '@properties/kms/QuestionProperties';

//mms
import AddPackagaMaterialLotProperties from '@properties/mms/AddPackagaMaterialLotProperties';
import UnPackagaMaterialLotProperties from '@properties/mms/UnPackagaMaterialLotProperties';
import QualityCheckProperties from '@properties/mms/QualityCheckProperties';
import OQCCheckProperties from '@properties/mms/OQCCheckProperties';

import PackageMaterialLotProperties from '@properties/mms/PackageMaterialLotProperties';
import MaterialLotProperties from '@properties/mms/MaterialLotProperties';
import MaterialStatusModelProperties from '@properties/mms/MaterialStatusModelProperties';
import MaterialProperties from '@properties/mms/MaterialProperties';
import MaterialLotStockInProperties from '@properties/mms/MaterialLotStockInProperties';
import MaterialLotInventoryProperties from '@properties/mms/MaterialLotInventoryProperties';

//gc
import GcCheckProperties from '@properties/gc/GcCheckProperties';
import GcMaterialLotStockInProperties from '@properties/gc/GcMaterialLotStockInProperties';
import MesFinishGoodProperties from '@properties/gc/MesFinishGoodProperties';
import GcOrderProperties from '@properties/gc/GcOrderProperties';
import PackCaseCheckProperties from '@properties/gc/PackCaseCheckProperties';
import GcPrintCaseLabelProperties from '@properties/gc/GcPrintCaseLabelProperties';
import GcReTestOrderProperties from '@properties/gc/GcReTestOrderProperties';
//dynax
import DynaxAnalyseProperties from '@properties/dynax/DynaxAnalyseProperties';

/**
 * 构建url ?表示可选参数
 * @param {*} url 
 */
const buildPath = (url) => {
  return url + "/:tableRrn/:parentRrn/:parameter1?/:parameter2?/:parameter3?/:parameter4?/:parameter5?"
}

const routerConfig = [
  {
    path: '/',
    layout: BlankLayout,
    component: Login,
  },
  {
    path: 'Home',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Home,
  },
  {
    path: buildPath('System/OnlineTableManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('System/OnlineTabManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('System/OnlineFieldManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('System/OnlineRefTableManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('System/SysRefNameManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('System/OrgRefNameManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('System/MessageManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('System/ParameterManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },

  {
    path: buildPath('Security/UserManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: UserProperties,
  },
  {
    path: buildPath('Security/RoleManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: RoleProperties,
  },
  //KMS
  {
    path: buildPath('KMS/QuestionManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: QuestionProperties,
  }, 
  {
    path: buildPath('KMS/QuestionHisManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  }, 
  //LMS
  {
    path: buildPath('LMS/IDGeneratorRuleManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GeneratorRuleProperties,
  },
  //MMS
  {
    path: buildPath('MMS/StatusModelManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialStatusModelProperties,
  },
  {
    path: buildPath('MMS/StatusCategoryManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('MMS/StatusManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('MMS/EventManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('MMS/RawMaterialManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialProperties,
  },
  {
    path: buildPath('MMS/MaterialLotManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotProperties,
  },
  {
    path: buildPath('MMS/MaterialLotHistoryManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityHistoryProperties,
  },
  {
    path: buildPath('MMS/MLotMergeRuleManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  //MES成品接收
  {
    path: buildPath('MMS/MESFinishGoodManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: MesFinishGoodProperties,
  },
  //Doc
  {
    path: buildPath('Doc/DeliveryOrderManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcOrderProperties,
  },
  {
    path: buildPath('Doc/ReTestOrderManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcReTestOrderProperties,
  },
  //WMS
  {
    path: buildPath('WMS/WarehouseManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('WMS/MLotInventoryManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotInventoryProperties,
  },
  {
    path: buildPath('WMS/StorageManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('WMS/MaterialLotStockIn'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotStockInProperties,
  },
  {
    path: buildPath('WMS/GCMaterialLotStockIn'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcMaterialLotStockInProperties,
  },
  {
    path: buildPath('WMS/CheckManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcCheckProperties,
  },
  //PackManager
  {
    path: buildPath('Pack/PackRuleManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('Pack/PackMaterialLot'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: PackageMaterialLotProperties,
  },
  {
    path: buildPath('Pack/AddPackMaterialLot'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: AddPackagaMaterialLotProperties,
  },
  {
    path: buildPath('Pack/UnPackMaterialLot'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: UnPackagaMaterialLotProperties,
  },
  {
    path: buildPath('Pack/PackCaseCheck'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: PackCaseCheckProperties,
  },
  {
    path: buildPath('Pack/StockOutCheck'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: OQCCheckProperties,
  },
  {
    path: buildPath('Pack/PrintCaseLabel'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcPrintCaseLabelProperties,
  },
  //RTM
  {
    path: buildPath('RTM/DynaxAnalyseManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: DynaxAnalyseProperties,
  },
  //RMS
  {
    path: buildPath('Rms/EquipmentManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('Rms/RecipeManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: '*',
    layout: HeaderAsideFooterResponsiveLayout,
    component: NotFound,
  },
];

export default routerConfig;
