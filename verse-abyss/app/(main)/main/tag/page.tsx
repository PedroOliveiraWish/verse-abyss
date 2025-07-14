'use client'

import React, { useState, useEffect } from "react";

import { getAllTags } from "@/pages/api/tags/tags";

import { Hero } from "@/app/component/hero/hero";
import { useRouter } from "next/navigation";

import './tag.css'

type Tag = {
  id: number
  nome: string
}

export default function Home() {
  const router = useRouter();

  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    fetchTags()
  }, [])

  async function fetchTags() {
    try {
      const response = await getAllTags();

      const json = await response.json()

      setTags(json);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="tag-page">

      <Hero
        title="Ecos do Inominável"
        text="As tags são como bússolas espirituais — guias que conduzem o leitor aos recantos mais obscuros ou iluminados do ser."
        sub="✨ Navegue pelas marcas deixadas por quem ousou nomear o indizível."
      />


      <div className="tags">
        {tags.map((tag) => (
          <div className="tag-card" onClick={() => router.push(`/main/tag/${tag.id}`)}>
            <p>{tag.nome}</p>
          </div>
        ))}
      </div>
    </div>

  );
}
