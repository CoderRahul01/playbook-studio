import { c as createLucideIcon } from "./index-rRcYy_Bl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function normalizeStep(s) {
  return {
    stepNumber: s.stepNumber,
    icon: s.icon,
    actionLabel: s.actionLabel,
    description: s.description,
    uiElement: s.uiElement
  };
}
function normalizePlaybook(p) {
  return {
    id: p.id,
    title: p.title,
    platformName: p.platformName,
    taskGoal: p.taskGoal,
    steps: p.steps.map(normalizeStep),
    screenshot: p.screenshot,
    createdAt: p.createdAt
  };
}
export {
  Search as S,
  normalizePlaybook as n
};
