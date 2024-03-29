import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import { cookies } from 'next/headers';

import { EmptyMemories } from '@/components/EmptyMemories';
import { api } from '@/lib/api';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

dayjs.locale(ptBr);

interface Memory {
  id: string;
  coverUrl: string;
  createdAt: string;
  excerpt: string;
}

export default async function Home() {
  const isAuthenticated = cookies().has('token');

  if (!isAuthenticated) return <EmptyMemories />;

  const token = cookies().get('token')?.value;

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memories: Memory[] = response.data;

  if (memories.length === 0) return <EmptyMemories />;

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        const coverType = memory.coverUrl.slice(-3);

        return (
          <div key={memory.id} className="space-y-4 break-words">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>

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
              <></>
            )}

            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>

            <Link
              href={`/memories/${memory.id}`}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            >
              Ler mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
