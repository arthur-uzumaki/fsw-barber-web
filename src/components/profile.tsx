import { getUser } from '@/lib/auth'
import { Avatar, AvatarImage } from './ui/avatar'

export function Profile() {
  const { avatar_url, email, name } = getUser()
  console.log(avatar_url)

  return (
    <div className="flex items-center gap-3 border-b border-solid p-5">
      <Avatar>
        <AvatarImage src={avatar_url} alt="Avatar do usuário" />
      </Avatar>
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-xs text-zinc-400">{email}</p>
      </div>
    </div>
  )
}
