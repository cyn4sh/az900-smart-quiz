import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StartScreenProps {
  onStart: () => void;
  onShowHistory: () => void;
}

export function StartScreen({ onStart, onShowHistory }: StartScreenProps) {
  return (
    <Card className="rounded-[12px] border border-border bg-surface p-2 ring-0">
      <CardHeader className="gap-3">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          Unofficial
        </p>
        <CardTitle role="heading" aria-level={1}className="font-heading text-2xl font-semibold">
          AZ-900 Smart Quiz
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          Ten original questions for Azure Fundamentals practice. After each
          answer you will see why it is right or wrong.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pt-2">
        <Button
          type="button"
          className="h-12 w-full rounded-[8px] text-base"
          onClick={onStart}
        >
          Start quiz
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="h-12 w-full rounded-[8px] text-base"
          onClick={onShowHistory}
        >
          History
        </Button>
      </CardContent>
    </Card>
  );
}