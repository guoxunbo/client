import Home from './pages/Home';

import BlankLayout from './layouts/BlankLayout';
import Login from './pages/Login';

import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';

import NotFound from './pages/NotFound';
import EntityProperties from './pages/Properties';
import UserProperties from './pages/Properties/components/userProperties/UserProperties';
import RoleProperties from './pages/Properties/components/RoleProperties';
import GeneratorRuleProperties from './pages/Properties/components/GeneratorRuleProperties';
import MaterialStatusModelProperties from './pages/Properties/components/MaterialStatusModelProperties';
import MaterialProperties from './pages/Properties/components/MaterialProperties';
import MaterialLotProperties from './pages/Properties/components/MaterialLotProperties';
import MaterialLotInventoryProperties from './pages/Properties/components/MaterialLotInventoryProperties';
import EntityHistoryProperties from './pages/Properties/components/EntityHistoryProperties';
import DynaxAnalyseProperties from './pages/Properties/components/DynaxAnalyseProperties';
import QuestionProperties from './pages/Properties/components/QuestionProperties';
import MesFinishGoodProperties from './pages/Properties/components/MesFinishGoodProperties';
import PackageMaterialLotProperties from './pages/Properties/components/PackageMaterialLotProperties';
import PackRelayBoxProperties from './pages/Properties/components/PackRelayBoxProperties';
import PackCaseCheckProperties from './pages/Properties/components/PackCaseCheckProperties';
import MaterialLotStockInProperties from './pages/Properties/components/MaterialLotStockInProperties';
import UnPackagaMaterialLotProperties from './pages/Properties/components/UnPackagaMaterialLotProperties';
import StockOutCheckProperties from './pages/Properties/components/StockOutCheckProperties';
import GcOrderProperties from './pages/Properties/components/GcOrderProperties';
import GcReTestOrderProperties from './pages/Properties/components/GcReTestOrderProperties';
import AddPackagaMaterialLotProperties from './pages/Properties/components/AddPackagaMaterialLotProperties';
import GcPrintCaseLabelProperties from './pages/Properties/components/GcPrintCaseLabelProperties';
import GcCheckProperties from './pages/Properties/components/GcCheckProperties';
import GcMaterialLotStockInProperties from './pages/Properties/components/GcMaterialLotStockInProperties';
import GcPrintVBoxLabelProperties from './pages/Properties/components/GcPrintVBoxLabelProperties';
import GcRecordExpressNumberProperties from './pages/Properties/components/GcRecordExpressNumberProperties';
import GcOrderReservedProperties from './pages/Properties/components/GcOrderReservedProperties';
import GCUnReservedMaterialLotProperties from './pages/Properties/components/GCUnReservedMaterialLotProperties';
import GcOrderReservedCaseProperties from './pages/Properties/components/GcOrderReservedCaseProperties';
import GcMaterialLotWeighProperties from './pages/Properties/components/GcMaterialLotWeighProperties';
import GCRelayBoxChangeStorageIdProperties from './pages/Properties/components/GCRelayBoxChangeStorageIdProperties';
import GCMesFinishGoodReceiveProperties from './pages/Properties/components/GCMesFinishGoodReceiveProperties';
import WaferImportProperties from './pages/Properties/components/WaferImportProperties';
import GcWaferReceiveOrderProperties from './pages/Properties/components/GcWaferReceiveOrderProperties';
import GcWaferIssueOrderProperties from './pages/Properties/components/gc/wafer-issue/GcWaferIssueOrderProperties';
import GCIncomingMaterialImportProperties from './pages/Properties/components/GCIncomingMaterialImportProperties';
import GCIncomingMLotDeleteProperties from './pages/Properties/components/GCIncomingMLotDeleteProperties';
import GcWaferStockInProperties from './pages/Properties/components/GcWaferStockInProperties';
import WLTFinishGoodProperties from './pages/Properties/components/WLTFinishGoodProperties';
import WltPackMaterialLotProperties from './pages/Properties/components/WltPackMaterialLotProperties';
import WltPackCaseCheckProperties from './pages/Properties/components/WltPackCaseCheckProperties';

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
  // Wafer相关
  {
    path: buildPath('Wafer/GCWaferImport'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: WaferImportProperties,
  },
  {
    path: buildPath('Wafer/GCWaferReceive'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcWaferReceiveOrderProperties,
  },
  {
    path: buildPath('Wafer/GCWaferIssue'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcWaferIssueOrderProperties,
  },
  {
    path: buildPath('Wafer/GCWaferCheck'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcCheckProperties,
  },
  {
    path: buildPath('Wafer/GCWaferInStorage'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcWaferStockInProperties,
  },
  //WLT相关
  {
    path: buildPath('WLT/WLTFinishGoodManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: WLTFinishGoodProperties,
  },
  //WLT装箱
  {
    path: buildPath('WLT/WLTPackMaterialLot'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: WltPackMaterialLotProperties,
  },
  //装箱检
  {
    path: buildPath('WLT/WLTPackCaseCheck'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: WltPackCaseCheckProperties,
  },
  //MES成品接收
  {
    path: buildPath('MMS/MESFinishGoodManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: MesFinishGoodProperties,
  },
  {
    path: buildPath('MMS/MESFinishGoodReceiveManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GCMesFinishGoodReceiveProperties,
  },
  //Doc
  {
    path: buildPath('Doc/DeliveryOrderManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcOrderProperties,
  },
  {
    path: buildPath('Doc/DeliveryOrderReservedManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcOrderReservedProperties,
  },
  {
    path: buildPath('Doc/ReservedCaseManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcOrderReservedCaseProperties,
  },
  {
    path: buildPath('/Doc/UnReservedMaterialLotManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GCUnReservedMaterialLotProperties,
  },
  
  {
    path: buildPath('Doc/ReTestOrderManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcReTestOrderProperties,
  },
  {
    path: buildPath('Doc/RecordExpressNumber'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcRecordExpressNumberProperties,
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
  {
    path: buildPath('WMS/MaterialLotWeigh'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcMaterialLotWeighProperties,
  },
  {
    path: buildPath('WMS/GCMaterialLotChangeStorage'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GCRelayBoxChangeStorageIdProperties,
  },
  {
    path: buildPath('WMS/IncomingMaterialImport'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GCIncomingMaterialImportProperties,
  },
  {
    path: buildPath('WMS/GCIncomingMLotDelete'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GCIncomingMLotDeleteProperties,
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
    path: buildPath('Pack/PackRelayBox'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: PackRelayBoxProperties,
  },
  {
    path: buildPath('Pack/PackCaseCheck'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: PackCaseCheckProperties,
  },
  {
    path: buildPath('Pack/StockOutCheck'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: StockOutCheckProperties,
  },
  {
    path: buildPath('Pack/PrintCaseLabel'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcPrintCaseLabelProperties,
  },
  {
    path: buildPath('Pack/PrintVBoxLabel'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcPrintVBoxLabelProperties,
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
