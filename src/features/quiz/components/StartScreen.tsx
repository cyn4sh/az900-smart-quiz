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
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <Card className="rounded-[12px] border border-border bg-surface p-2 ring-0">
      <CardHeader className="gap-3">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          Unofficial
        </p>
        <CardTitle className="font-heading text-2xl font-semibold">
          AZ-900 Smart Quiz
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          Ten original questions for Azure Fundamentals practice. After each
          answer you will see why it is right or wrong.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <Button
          type="button"
          className="h-12 w-full rounded-[8px] text-base"
          onClick={onStart}
        >
          Start quiz
        </Button>
      </CardContent>
    </Card>
  );
}
