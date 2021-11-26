import { defineRule, configure } from "vee-validate";
import { setLocale, localize } from "@vee-validate/i18n";
import es from "@vee-validate/i18n/dist/locale/es.json";

configure({
  generateMessage: localize("es", es),
});

setLocale("es");

// install rules
import { required, email, min, max, numeric } from "@vee-validate/rules";
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("numeric", numeric);
