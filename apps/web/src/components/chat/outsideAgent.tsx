import type { OrchestrationV2Actor, OrchestrationV2CreationSource } from "@t3tools/contracts";
import { grokClient } from "@t3tools/provider-grok/client";
import type { SVGProps } from "react";

import { ProviderPackageIcon } from "./ProviderPackageIcon";

/**
 * CONCEPT PROTOTYPE. T3 records that an outside MCP client launched a thread or
 * sent a message (`createdBy: "agent"`, `creationSource: "mcp"`), but not which
 * client. A shippable version persists the MCP client's session and name on
 * `thread.create` and `message.dispatch`; until then this concept treats every
 * outside MCP client as the connected Grok Bot.
 */
export const OUTSIDE_AGENT = { label: "Grok Bot", icon: grokClient.icon } as const;

/** A thread or message an outside MCP client created, not one a T3 thread delegated. */
export function isFromOutsideAgent(value: {
  readonly createdBy?: OrchestrationV2Actor;
  readonly creationSource?: OrchestrationV2CreationSource;
  readonly senderThreadId?: string;
}): boolean {
  return (
    value.createdBy === "agent" &&
    value.creationSource === "mcp" &&
    value.senderThreadId === undefined
  );
}

export function OutsideAgentGlyph(props: SVGProps<SVGSVGElement>) {
  return <ProviderPackageIcon aria-hidden icon={OUTSIDE_AGENT.icon} {...props} />;
}
