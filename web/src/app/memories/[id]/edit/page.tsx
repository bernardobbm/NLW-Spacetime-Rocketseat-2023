import { EditMemoryForm } from '@/components/EditMemoryForm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditMemory() {
  return (
    <div className="m-8 flex h-full flex-col gap-6">
      <Link
        href={'/'}
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar a timeline
      </Link>

      <EditMemoryForm />
    </div>
  );
}
