import adminSupplierOrder from "@/content/resource-bank/approved/admin-supplier-order-email-a2-low.json";
import commerceCustomerComplaint from "@/content/resource-bank/approved/commerce-customer-complaint-b1-low.json";
import hairdressingAppointmentReply from "@/content/resource-bank/approved/hairdressing-appointment-reply-a2.json";
import hospitalityBookingConfirmation from "@/content/resource-bank/approved/hospitality-booking-confirmation-b1.json";
import itHelpdeskPhoneCall from "@/content/resource-bank/approved/it-helpdesk-phone-call-a2-high.json";
import { calculateResourceBankCoverage } from "@/lib/resource-bank/coverage";
import { assertResourceBankItem } from "@/lib/resource-bank/validate-resource-bank-item";
import type { ResourceBankItem } from "@/types/resource-bank";

const approvedResourceBankJson = [
  adminSupplierOrder,
  commerceCustomerComplaint,
  itHelpdeskPhoneCall,
  hairdressingAppointmentReply,
  hospitalityBookingConfirmation,
];

const toResourceBankItem = (item: unknown): ResourceBankItem => {
  assertResourceBankItem(item);
  return item;
};

export const approvedResourceBankItems = approvedResourceBankJson
  .map(toResourceBankItem)
  .sort((first, second) => first.title.localeCompare(second.title, "es"));

export const resourceBankStats = {
  total: approvedResourceBankItems.length,
  families: new Set(
    approvedResourceBankItems.map((item) => item.professionalFamily),
  ).size,
  levels: new Set(approvedResourceBankItems.map((item) => item.languageLevel)).size,
  resourceTypes: new Set(approvedResourceBankItems.map((item) => item.type)).size,
};

export const resourceBankCoverage =
  calculateResourceBankCoverage(approvedResourceBankItems);
