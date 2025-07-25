import { TemplatesGallery } from './templatesGallery';
import { useTemplatesModal } from './useTemplatesModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/kit/dialog';

export function TemplatesModal() {
  const { isOpen, close } = useTemplatesModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Выберите шаблон</DialogTitle>
          <DialogDescription>
            Выберите шаблон для создания новой доски
          </DialogDescription>
        </DialogHeader>

        <TemplatesGallery className="h-[60vh] pr-4" />
      </DialogContent>
    </Dialog>
  );
}
