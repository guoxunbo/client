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

const routerConfig = [
  {
    path: '/',
    layout: BlankLayout,
    component: Login,
  },
  {
    path: '/Home',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Home,
  },
  {
    path: 'System/OnlineTableManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'System/OnlineTabManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'System/OnlineFieldManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'System/OnlineRefTableManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'System/SysRefNameManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'System/OrgRefNameManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'System/MessageManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'Security/UserManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: UserProperties,
  },
  {
    path: 'Security/RoleManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: RoleProperties,
  },
  //KMS
  {
    path: 'KMS/QuestionManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: QuestionProperties,
  }, 
  {
    path: 'KMS/QuestionHisManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  }, 
  //LMS
  {
    path: 'LMS/IDGeneratorRuleManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: GeneratorRuleProperties,
  },
  //MMS
  {
    path: '/MMS/StatusModelManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialStatusModelProperties,
  },
  {
    path: '/MMS/StatusCategoryManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: '/MMS/StatusManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: '/MMS/EventManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: '/MMS/RawMaterialManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialProperties,
  },
  {
    path: '/MMS/MaterialLotManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotProperties,
  },
  {
    path: '/MMS/MaterialLotHistoryManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityHistoryProperties,
  },
  {
    path: 'MMS/MLotMergeRuleManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  //MES成品接收
  {
    path: '/MMS/MESFinishGoodManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: MesFinishGoodProperties,
  },
  //Doc
  {
    path: '/Doc/DeliveryOrderManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcOrderProperties,
  },
  {
    path: '/Doc/ReTestOrderManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcReTestOrderProperties,
  },
  //WMS
  {
    path: '/WMS/WarehouseManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: '/WMS/MLotInventoryManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotInventoryProperties,
  },
  {
    path: '/WMS/StorageManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: '/WMS/MaterialLotStockIn/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotStockInProperties,
  },
  {
    path: '/WMS/CheckManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcCheckProperties,
  },
  //PackManager
  {
    path: '/Pack/PackRuleManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: '/Pack/PackMaterialLot/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: PackageMaterialLotProperties,
  },
  {
    path: '/Pack/AddPackMaterialLot/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: AddPackagaMaterialLotProperties,
  },
  {
    path: '/Pack/UnPackMaterialLot/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: UnPackagaMaterialLotProperties,
  },
  {
    path: '/Pack/PackRelayBox/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: PackRelayBoxProperties,
  },
  {
    path: '/Pack/PackCaseCheck/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: PackCaseCheckProperties,
  },
  {
    path: '/Pack/StockOutCheck/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: StockOutCheckProperties,
  },
  {
    path: '/Pack/PrintCaseLabel/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcPrintCaseLabelProperties,
  },
  //RTM
  {
    path: '/RTM/DynaxAnalyseManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: DynaxAnalyseProperties,
  },
  //RMS
  {
    path: 'Rms/EquipmentManager/:tableRrn/:parentRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'Rms/RecipeManager/:tableRrn/:parentRrn',
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
