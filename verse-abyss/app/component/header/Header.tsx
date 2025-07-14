'use client'

import React from "react";
import './header.css';

import {
  HomeIcon,
  StarIcon,
  BookmarkIcon,
  PersonIcon,
  ExitIcon
} from "@radix-ui/react-icons";

import { useRouter } from "next/navigation";

export function Header() {

  const router = useRouter();

  return (
    <div className="header">
      <div className="title-header">
        Verse Abyss
      </div>
      <nav>
        <ul>
          <li onClick={() => router.push('/main')}>
            <HomeIcon />
            <span>Início</span>
          </li>
          <li>
            <StarIcon />
            <span>Favoritos</span>
          </li>
          <li onClick={() => router.push('/main/tag')}>
            <BookmarkIcon />
            <span>Tags</span>
          </li>
          <li>
            <PersonIcon />
            <span>User</span>
          </li>
        </ul>

        <ul>
          <li onClick={() => router.push('/')}>
            <ExitIcon />
            <span>Sair</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}
