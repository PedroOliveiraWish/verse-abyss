import { Text } from "@/pages/interface/text";
import { Avatar } from "radix-ui";
import { DropdownMenu } from "radix-ui";

import { createFavorite } from "@/pages/api/favorites/favorites";

import {
  HeartFilledIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import './textCard.css';

export function TextCard({
  id,
  titulo,
  conteudo,
  criadoEm,
  isFavorited,
  quantFavoritos,
  userId,
  tagId,
  tag,
  user,
}: Text) {

  const favoriteText =  async (textId: number) => {
    try {
      const response = await createFavorite(textId)

      const json = await response.json()

      alert(json.message)
    } catch (error) {
      console.log(error)
    }
  }
  return (


    <article className="text-card" key={id}>
      {/* Header */}
      <div className="header-text-card">
        <div className="people">
          <Avatar.Root>
            <Avatar.Fallback className="avatar-fallback">
              {user.nome[0]}
            </Avatar.Fallback>
          </Avatar.Root>
          <div className="nome-email">
            <span className="nome">{user.nome}</span>
            <span className="data">
              {new Date(criadoEm).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="dropdown">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button>
                <DotsHorizontalIcon />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  {new Date(criadoEm).toLocaleDateString()}
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>{user.email}</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      {/* Corpo */}
      <div className="separator"></div>

      <div className="body-text-card">
        <div className="title-text-card">{titulo}</div>
        <div className="content-text-card">{conteudo}</div>
      </div>

      <div className="separator"></div>

      {/* Rodapé */}
      <div className="footer-text-card">
        <div className="tag-footer-card">#{tag.nome}</div>
        <div className="favorito-info">
          <HeartFilledIcon
          onClick={() => favoriteText(id)}
          width={19}
            className={`heart-icon ${isFavorited ? 'favorited' : ''}`}
          />
          <span className="quantidade-favoritos">
            {quantFavoritos} favoritos
          </span>
        </div>
      </div>
    </article>
  );
}
