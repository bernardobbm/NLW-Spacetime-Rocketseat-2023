'use client';

import { api } from '@/lib/api';
import Cookie from 'js-cookie';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function DeleteMemory() {
  const router = useRouter();
  const params = useParams();

  const { id } = params;

  async function handleDeleteMemory() {
    const token = Cookie.get('token');

    await api.delete(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    router.push('/');
  }

  return (
    <div className="m-8 flex h-full flex-col gap-6">
      <Link
        href={'/'}
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar a timeline
      </Link>

      <div className="m-10 flex h-full w-auto flex-col items-center justify-center gap-5">
        <h1 className="text-xl font-bold">
          Você está prestes a apagar uma memória para sempre!
        </h1>

        <p>
          Tem certeza que deseja apagar a memória? Após isso, não será possível
          recuperá-la!
        </p>

        <div className="flex gap-10">
          <input
            type="button"
            onClick={handleDeleteMemory}
            value="Sim, quero apagar a memória!"
            className="flex cursor-pointer items-center gap-1 text-sm text-red-500 hover:text-red-400"
          />

          <input
            type="button"
            onClick={router.back}
            value="Não, me leve de volta."
            className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
