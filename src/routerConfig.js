import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';

import HeaderAsideFooterResponsiveLayout from '@layouts/HeaderAsideFooterResponsiveLayout';
import BlankLayout from '@layouts/BlankLayout';

// framework
import EntityProperties from '@properties/framework/EntityProperties';
import EntityHistoryProperties from '@properties/framework/EntityHistoryProperties';
import GeneratorRuleProperties from '@properties/idgenerator/GeneratorRuleProperties';
import MessageProperties from '@properties/framework/MessageProperties';
import ParameterProperties from '@properties/framework/ParameterProperties';

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
import IncomingMaterialImportProperties from '@properties/mms/IncomingMaterialImportProperties';
import IncomingMaterialReceiveProperties from '@properties/mms/IncomingMaterialReceiveProperties';
import IncomingMLotReceiveProperties from '@pages/Properties/mms/IncomingMLotReceiveProperties';
import IncomingMLotImportProperties from '@properties/mms/IncomingMLotImportProperties';
import IncomingLabMLotImportProperties from '@pages/Properties/mms/IncomingLabMLotImportProperties';
import IncomingMaterialDeleteProperties from '@properties/mms/IncomingMaterialDeleteProperties';
import IssueLotOrderProperties from '@properties/mms/IssueLotOrderProperties';
import IssueByMaterialOrderProperties from '@pages/Properties/mms/IssueByMaterialOrderProperties';
import IssueByMLotOrderProperties from '@pages/Properties/mms/IssueByMLotOrderProperties';
import CreateIssueOrderByMaterialProperties from '@pages/Properties/mms/CreateIssueOrderByMaterialProperties';
import RecommendIssueMLotProperties from '@pages/Properties/mms/RecommendIssueMLotProperties';
import CreateIssueOrderByMLotProperties from '@pages/Properties/mms/CreateIssueOrderByMLotProperties';
import SplitMLotProperties from '@properties/mms/SplitMLotProperties';
import MaterialLotHoldProperties from '@properties/mms/MaterialLotHoldProperties';
import MaterialLotReleaseProperties from '@properties/mms/MaterialLotReleaseProperties';
import ProductProperties from '@properties/mms/ProductProperties';
import CsvImportProperties from '@pages/Properties/mms/CsvImportProperties';
import ImportRawMaterialProperties from '@pages/Properties/mms/ImportRawMaterialPropertiest';
import LabMaterialProperties from '@pages/Properties/mms/LabMaterialProperties';
import CreateReturnMLotOrderProperties from '@pages/Properties/mms/CreateReturnMLotOrderProperties';
import ReturnMLotOrderProperties from '@pages/Properties/mms/ReturnMLotOrderProperties'; 
import CreateReturnLotOrderProperties from '@pages/Properties/mms/CreateReturnLotOrderProperties';
import ReturnLotOrderProperties from '@pages/Properties/mms/ReturnLotOrderProperties';
import SpareMaterialProperties from '@pages/Properties/mms/SpareMaterialProperties';
import StockOutSpareMLotProperties from '@pages/Properties/mms/StockOutSpareMLotProperties';
import ScrapSpareMaterialInventoryProperties from '@pages/Properties/mms/ScrapSpareMaterialInventoryProperties';
import DocQueryManagerProperties from '@pages/Properties/mms/DocQueryManagerProperties';

//gc
import GcCheckProperties from '@properties/gc/GcCheckProperties';
import GcMaterialLotStockInProperties from '@properties/gc/GcMaterialLotStockInProperties';
import MesFinishGoodProperties from '@properties/gc/MesFinishGoodProperties';
import GcOrderProperties from '@properties/gc/GcOrderProperties';
import PackCaseCheckProperties from '@properties/gc/PackCaseCheckProperties';
import GcPrintCaseLabelProperties from '@properties/gc/GcPrintCaseLabelProperties';
import GcReTestOrderProperties from '@properties/gc/GcReTestOrderProperties';

//rms
import EquipmentRecipeProperties from '@properties/rms/EquipmentRecipeProperties';
import EquipmentProperties from '@properties/rms/EquipmentProperties';
import MaterialLotQcProperties from '@pages/Properties/mms/MaterialLotQcProperties';
import MaterialLotIqcManagerProperties from '@pages/Properties/mms/MaterialLotIqcManagerProperties';
import MaterialLotOqcManagerProperties from '@pages/Properties/mms/MaterialLotOqcManagerProperties';
import MobileHome from '@pages/Mobile/MobileHome';
import ReceiveMLotByOrderProperties from '@pages/Properties/mms/mobile/ReceiveMLotByOrderProperties';
import SplitMaterialLotProperties from '@pages/Properties/mms/mobile/SplitMaterialLotProperties';
import PrintMaterialLotProperties from '@pages/Properties/mms/mobile/PrintMaterialLotProperties';
import PackageMLotProperties from '@pages/Properties/mms/mobile/PackageMLotProperties';
import StockInMLotProperties from '@pages/Properties/mms/mobile/StockInMLotProperties';
import StockOutMLotProperties from '@pages/Properties/mms/mobile/StockOutMLotProperties';
import SplitAndPrintMLotProperties from '@pages/Properties/mms/mobile/SplitAndPrintMLotProperties';
import IssueMLotByOrderProperties from '@pages/Properties/mms/mobile/IssueMLotByOrderProperties';
import MLotTransferInvProperties from '@pages/Properties/mms/mobile/MLotTransferInvProperties';
import ReceiveFinishGoodByOrderProperties from '@pages/Properties/mms/mobile/ReceiveFinishGoodByOrderProperties';
import StockOutMLotByOrderProperties from '@pages/Properties/mms/mobile/StockOutMLotByOrderProperties';
import ReceiveMaterialLotOrderProperties from '@pages/Properties/mms/mobile/ReceiveMaterialLotOrderProperties';
import StockInFinishGoodProperties from '@pages/Properties/mms/mobile/StockInFinishGoodProperties';
import ShipOutMLotProperties from '@pages/Properties/mms/mobile/ShipOutMLotProperties';
import WeightMaterialLotProperties from '@pages/Properties/mms/mobile/WeightMaterialLotProperties';
import PackCaseCheckMaterialLotProperties from '@pages/Properties/mms/mobile/PackCaseCheckMaterialLotProperties';
import IncomingStockInByOrderProperties from '@pages/Properties/mms/mobile/IncomingStockInByOrderProperties';

//vc
import VcDeliveryOrderProperties from '@properties/vc/VcDeliveryOrderProperties';
import VcApproveDocumentProperties from '@pages/Properties/vc/VcApproveDocumentProperties';
import VcFinishGoodReceiveProperties from '@properties/vc/VcFinishGoodReceiveProperties'
import VcReservedMLotProperties from '@properties/vc/VcReservedMLotProperties'
import VcUnReservedMLotProperties from '@properties/vc/VcUnReservedMLotProperties'
import VcStockOutProperties from '@properties/vc/VcStockOutProperties'
import VcMaterialLotInventoryProperties from '@pages/Properties/vc/VcMaterialLotInventoryProperties';
import VcExcelPrintProperties from '@pages/Properties/vc/VcExcelPrintProperties';
import VcPrintCaseLabelProperties from '@pages/Properties/vc/VcPrintCaseLabelProperties';
import VcPackCheckProperties from '@pages/Properties/vc/VcPackCheckProperties';
import VcBoxWeightProperties from '@pages/Properties/vc/VcBoxWeightProperties';
import VcPrintIssueOrderProperties from '@pages/Properties/vc/VcPrintIssueOrderProperties';
import VcStockOutMLotByOrderProperties from '@pages/Properties/vc/VcStockOutMLotByOrderProperties';
import VcStorageProperties from '@pages/Properties/vc/VcStorageProperties';

import MaterialLot from '@api/dto/mms/MaterialLot';
import VcCheckProperties from '@pages/Properties/vc/VcCheckProperties';
import ImportPartsMLotProperties from '@pages/Properties/mms/ImportPartsMLotProperties';
import ReturnOrderProperties from '@pages/Properties/mms/ReturnOrderProperties';
import EntityTreeProperties from '@pages/Properties/framework/EntityTreeProperties';
import SpareMaterialInventoryProperties from '@pages/Properties/mms/SpareMaterialInventoryProperties';
import VcPrintRYBoxLabelProperties from '@pages/Properties/vc/VcPrintRYBoxLabelProperties';
import VcCheckByOrderProperties from '@pages/Properties/vc/VcCheckByOrderProperties';
import VcQCApprovalProperties from '@pages/Properties/vc/VcQCApprovalProperties';
import EntityScanProperties from '@pages/Properties/framework/EntityScanProperties';
import CreateDeptReturnProperties from '@pages/Properties/mms/CreateDeptReturnProperties';
import DeptReturnLotOrderProperties from '@pages/Properties/mms/DeptReturnLotOrderProperties';
import RetryInterfaceProperties from '@pages/Properties/mms/RetryInterfaceProperties';
import VcScrapByOrderProperties from '@pages/Properties/vc/VcScrapByOrderProperties';
import VcCreateOrderProperties from '@pages/Properties/vc/VcCreateOrderProperties';
import DocStockUpProperties from '@pages/Properties/mms/DocStockUpProperties';
import UpdateMLotProperties from '@pages/Properties/mms/mobile/UpdateMLotProperties';
import CheckMLotProperties from '@pages/Properties/mms/mobile/CheckMLotProperties';
import CheckOrderProperties from '@pages/Properties/mms/mobile/CheckOrderProperties';


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
    component: MessageProperties,
  },
  {
    path: buildPath('System/ParameterManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: ParameterProperties,
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
  {
    path: buildPath('LMS/LabelTemplateManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('LMS/WorkStationManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
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
  {
    path: buildPath('MMS/IncomingMaterialImport'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: IncomingMaterialImportProperties,
  },
  {
    path: buildPath('MMS/IncomingMaterialDelete'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: IncomingMaterialDeleteProperties,
  },
  {
    path: buildPath('MMS/IncomingMaterialReceive'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: IncomingMaterialReceiveProperties,
  },
  {
    path: buildPath('MMS/IncomingMLotReceive'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: IncomingMLotReceiveProperties,
  },
  {
    path: buildPath('MMS/IssueLotOrder'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: IssueLotOrderProperties,
  },
  {
    path: buildPath('MMS/IncomingMLotImport'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: IncomingMLotImportProperties,
  },
  {
    path: buildPath('MMS/IncomingLabMLotImport'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: IncomingLabMLotImportProperties,
  },
  {
    path: buildPath('MMS/NBQueryManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('MMS/NBAuthorityManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  // 质量相关
  {
    path: buildPath('MQC/IqcManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
 {
    path: buildPath('MQC/MLotQC'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotIqcManagerProperties,
  },
  {
    path: buildPath('MQC/OqcManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('MQC/MLotOQC'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotOqcManagerProperties,
  },
  {
    path: buildPath('MQC/QueryMLotQC'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityHistoryProperties,
  },
  {
    path: buildPath('MQC/QCApprovalManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcQCApprovalProperties,
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
    component: VcStorageProperties,
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
    component: VcCheckProperties,
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
    component: VcPackCheckProperties,
  },
  {
    path: buildPath('Pack/StockOutCheck'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: OQCCheckProperties,
  },
  {
    path: buildPath('Pack/PrintCaseLabel'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcPrintCaseLabelProperties,
  },
  {
    path: buildPath('Pack/PrintRYBoxLabel'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcPrintRYBoxLabelProperties,
  },

  //RMS
  {
    path: buildPath('Rms/EquipmentManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EquipmentProperties,
  },
  {
    path: buildPath('Rms/RecipeManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('Rms/EquipmentRecipe'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EquipmentRecipeProperties,
  },
  {
    path: buildPath('VC/VCMLotDocRule'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },

  //MobileMenu of WMS
  {
    path: 'MobileHome',
    layout: BlankLayout,
    component: MobileHome,
  },

  {
    path: buildPath('MMS/Mobile/ReceiveMLot'),
    layout: BlankLayout,
    component: ReceiveMLotByOrderProperties,
  },
  
  {
    path: buildPath('MMS/Mobile/SplitMLot'),
    layout: BlankLayout,
    component: SplitMaterialLotProperties,
  },

  {
    path: buildPath('MMS/Mobile/PrintMLot'),
    layout: BlankLayout,
    component: PrintMaterialLotProperties,
  },
  {
    path: buildPath('MMS/Mobile/Package'),
    layout: BlankLayout,
    component: PackageMLotProperties,
  },
  {
    path: buildPath('MMS/Mobile/StockIn'),
    layout: BlankLayout,
    component: StockInMLotProperties,
  },
  {
    path: buildPath('MMS/Mobile/StockOut'),
    layout: BlankLayout,
    component: StockOutMLotProperties,
  },
  {
    path: buildPath('MMS/Mobile/SplitAndPrintMLot'),
    layout: BlankLayout,
    component: SplitAndPrintMLotProperties,
  },
  {
    path: buildPath('MMS/Mobile/ReceiveMaterialLot'),
    layout: BlankLayout,
    component: ReceiveMaterialLotOrderProperties,
  },
  {
    path: buildPath('MMS/Mobile/IssueMLotByOrder'),
    layout: BlankLayout,
    component: IssueMLotByOrderProperties,
  },
  {
    path: buildPath('MMS/Mobile/MLotTransferInv'),
    layout: BlankLayout,
    component: MLotTransferInvProperties,
  },
  {
    path: buildPath('MMS/Mobile/ReceiveFinishGoodByOrder'),
    layout: BlankLayout,
    component: ReceiveFinishGoodByOrderProperties,
  },
  {
    path: buildPath('MMS/Mobile/StockOutByOrder'),
    layout: BlankLayout,
    component: StockOutMLotByOrderProperties,
  },
  {
    path: buildPath('MMS/Mobile/StockInFinishGood'),
    layout: BlankLayout,
    component: StockInFinishGoodProperties,
  },
  {
    path: buildPath('MMS/Mobile/ShipOut'),
    layout: BlankLayout,
    component: ShipOutMLotProperties,
  },
  {
    path: buildPath('MMS/Mobile/WeightMLot'),
    layout: BlankLayout,
    component: WeightMaterialLotProperties,
  },
  {
    path: buildPath('MMS/Mobile/PackCaseCheck'),
    layout: BlankLayout,
    component: PackCaseCheckMaterialLotProperties,
  },
  {
    path: buildPath('MMS/Mobile/IncomingStockInByOrder'),
    layout: BlankLayout,
    component: IncomingStockInByOrderProperties,
  },
  {
    path: buildPath('MMS/Mobile/CheckMLot'),
    layout: BlankLayout,
    component: CheckOrderProperties,
  },
  {
    path: buildPath('MMS/Mobile/UpdateMLot'),
    layout: BlankLayout,
    component: UpdateMLotProperties,
  },

  {
    path: buildPath('MMS/ReturnMLotOrder'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: ReturnMLotOrderProperties,
  },
  {
    path: buildPath('MMS/MaterialLotSplit'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: SplitMLotProperties,
  },
//发料
  {
    path: buildPath('MMS/IssueMaterialOrder'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: IssueLotOrderProperties,
  },
  {
    path: buildPath('MMS/CreateIssueOrderByMLot'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: CreateIssueOrderByMLotProperties,
  },
  {
    path: buildPath('MMS/IssueByMLot'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: IssueByMLotOrderProperties,
  },
  {
    path: buildPath('MMS/CreateIssueOrderByMaterial'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: CreateIssueOrderByMaterialProperties,
  },
  {
    path: buildPath('MMS/RecommendIssueMLot'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: RecommendIssueMLotProperties,
  },
  {
    path: buildPath('MMS/IssueByMaterial'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: IssueByMaterialOrderProperties,
  },
  {
    path: buildPath('MMS/CreateLabMLotOrder'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: CreateIssueOrderByMLotProperties,
  },
  {
    path: buildPath('MMS/IssueLabMLotOrder'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: IssueByMLotOrderProperties,
  },
  //release
  {
    path: buildPath('MMS/MaterialLotRelease'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotReleaseProperties,
  },
  {
    path: buildPath('VC/MLotReleasePE'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotReleaseProperties,
  },
  {
    path: buildPath('VC/MLotReleaseS'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotReleaseProperties,
  },
  {
    path: buildPath('VC/MLotReleaseQc'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotReleaseProperties,
  },
  {
    path: buildPath('MMS/MaterialLotHold'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotHoldProperties,
  },
  {
    path: buildPath('MMS/ProductManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: ProductProperties,
  },
  {
    path: buildPath('MMS/LabMaterialManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: LabMaterialProperties,
  },
  {
    path: buildPath('MMS/RawMaterialImport'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: ImportRawMaterialProperties,
  },
  {
    path: buildPath('MMS/ProductImport'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: CsvImportProperties,
  },
  {
    path: buildPath('MMS/MaterialModelConversion'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  // {
  //   path: buildPath('MMS/LabMaterialManager'),
  //   layout: HeaderAsideFooterResponsiveLayout,
  //   component: EntityProperties,
  // },
  //成品发料
  {
    path: buildPath('MMS/IssueFinishGoodOrder'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: IssueLotOrderProperties,
  },

  {
    path: buildPath('VC/VcDeliveryOrderPrint'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcDeliveryOrderProperties,
  },
  {
    path: buildPath('VC/ApproveDocument'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcApproveDocumentProperties,
  },
  {
    path: buildPath('VC/VcFinishGoodReceive'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcFinishGoodReceiveProperties,
  },
  {
    path: buildPath('VC/VcReservedMLot'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcReservedMLotProperties,
  },
  {
    path: buildPath('VC/VcUnReservedMLot'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcUnReservedMLotProperties,
  },
  {
    path: buildPath('VC/VcBoxWeigh'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcBoxWeightProperties,
  },
  //出货
  {
    path: buildPath('VC/VcStockOut'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcStockOutProperties,
  },
  {
    path: buildPath('VC/VcInventoryManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcMaterialLotInventoryProperties,
  },
  {
    path: buildPath('/VC/VcStockOutByOrder'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcStockOutMLotByOrderProperties,
  },
  //LabelPrint
  {
    path: buildPath('VC/VcPrintExcelLabel'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcExcelPrintProperties,
  },
  {
    path: buildPath('VC/VcPrintIssueOrderLabel'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcPrintIssueOrderProperties,
  },
  {
    path: buildPath('VC/ReturnSupplier'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: ReturnOrderProperties,
  },
  {
    path: buildPath('VC/CreateReturnOrder'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: CreateReturnMLotOrderProperties,
  },
  {
    path: buildPath('VC/ImportReturnLotOrder'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: CreateReturnLotOrderProperties,
  },
  {
    path: buildPath('VC/VCReturnGoods'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: ReturnLotOrderProperties,
  },

  //spare part
  {
    path: buildPath('MMS/ImportPartsMLot'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: ImportPartsMLotProperties,
  },

  {
    path: buildPath('MMS/PartsMaterialManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: SpareMaterialProperties,
  },
  {
    path: buildPath('MMS/PartsMLotHisManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityHistoryProperties,
  },
  {
    path: buildPath('MMS/StockOutPartsMLot'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: StockOutSpareMLotProperties,
  },
  {
    path: buildPath('MMS/PartsMaterialInventory'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: SpareMaterialInventoryProperties,
  },
  {
    path: buildPath('MMS/ScrapPartsMaterialInventory'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: ScrapSpareMaterialInventoryProperties,
  },
  {
    path: buildPath('MMS/PartsWarehouseManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: buildPath('WMS/CheckByOrder'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcCheckByOrderProperties,
  },
  {
    path: buildPath('MMS/DocQueryManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: DocQueryManagerProperties,
  },
  {
    path: buildPath('MMS/CreateDeptReturn'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: CreateDeptReturnProperties,
  },
  {
    path: buildPath('MMS/DeptReturnMLot'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: DeptReturnLotOrderProperties,
  },
  {
    path: buildPath('VC/ScrapByOrder'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcScrapByOrderProperties,
  },
  {
    path: buildPath('MMS/CreateCheckOrder'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: VcCreateOrderProperties,
  },
  {
    path: buildPath('MMS/DocStockUpManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: DocStockUpProperties,
  },

  //Monitoring
  {
    path: buildPath('Monitoring/InterfaceHisManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityHistoryProperties,
  },
  {
    path: buildPath('Monitoring/InterfaceFailManager'),
    layout: HeaderAsideFooterResponsiveLayout,
    component: RetryInterfaceProperties,
  },
  {
    path: '*',
    layout: HeaderAsideFooterResponsiveLayout,
    component: NotFound,
  },
];

export default routerConfig;
