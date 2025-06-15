import Link from "next/link";
import { Button } from "./ui/button";

export function DeployButton() {
  return (
    <>
        <Button className="flex items-center gap-2" size="sm">
          <span>Teams</span>
        </Button>
    </>
  );
}
