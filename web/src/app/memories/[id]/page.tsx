import { EmptyMemories } from '@/components/EmptyMemories';
import { api } from '@/lib/api';
import dayjs from 'dayjs';
import { ChevronLeft, Pencil, Trash2 } from 'lucide-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

interface UserMemory {
  id: string;
  userId: string;
  content: string;
  coverUrl: string;
  isPublic: string;
  createdAt: string;
}

export default async function Memory({ params }: { params: { id: string } }) {
  const isAuthenticated = cookies().has('token');

  if (!isAuthenticated) return <EmptyMemories />;

  const token = cookies().get('token')?.value;

  const response = await api.get(`/memories/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memory: UserMemory = response.data;

  const coverType = memory.coverUrl.slice(-3);

  return (
    <div className="m-8 flex flex-col gap-6">
      <div className="flex justify-between">
        <Link
          href={'/'}
          className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
          voltar a timeline
        </Link>

        <div className="flex gap-10">
          <Link
            href={`${memory.id}/delete`}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
            Apagar memória
          </Link>

          <Link
            href={`${memory.id}/edit`}
            className="flex items-center gap-1 text-sm text-yellow-300 hover:text-yellow-200"
          >
            <Pencil className="h-4 w-4" />
            Alterar memória
          </Link>
        </div>
      </div>

      <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
        {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
      </time>

      <div className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100">
        <input
          type="checkbox"
          checked={Boolean(memory.isPublic)}
          disabled
          className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
        />
        Memória pública
      </div>

      {coverType ? (
        coverType === 'jpg' || coverType === 'png' ? (
          <Image
            className="aspect-video w-full rounded-lg object-cover"
            src={memory.coverUrl}
            width={592}
            height={280}
            alt=""
          />
        ) : (
          <video
            src={memory.coverUrl}
            className="aspect-video w-full rounded-lg object-cover"
          />
        )
      ) : (
        <p className="text-gray-300">Memória sem mídia</p>
      )}

      <p className="text-lg text-gray-50">{memory.content}</p>
    </div>
  );
}
