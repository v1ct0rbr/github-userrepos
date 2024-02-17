
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Repository } from "@/pages/Home"
import { currentLocale, timeLocale } from "@/utils/constants"
import { format } from "date-fns"
import { CalendarDays, Star } from "lucide-react"
import { Children, ReactNode } from 'react'
import { Badge } from "../ui/badge"

interface MyHoverCardProps {
  repo: Repository,
  children: ReactNode

}

export function MyHoverCard({ repo, children }: MyHoverCardProps) {
  const singleChild = Children.only(children)
  return (

    <HoverCard>
      <HoverCardTrigger asChild>
        {singleChild}
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">

          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{repo.name}</h4>
            <p className="text-sm">
              {repo.description}

            </p>
            <p className="grid grid-cols-2 items-center pt-2 gap-1">
              <b className="flex items-center gap-1"><CalendarDays className="mr-2 h-4 w-4 opacity-70" /> Criado em: </b> {format(repo.created_at, timeLocale.format, { locale: currentLocale })}
  

            </p>
            <p className="grid grid-cols-2 items-center pt-2 gap-1">
              <b className="flex items-center gap-1"><CalendarDays className="mr-2 h-4 w-4 opacity-70" />Atualizado: </b>{format(repo.updated_at, timeLocale.format, { locale: currentLocale })}

              

            </p>
            <div className="flex items-center pt-2 gap-1">
              <span className="text-xs text-muted-foreground flex items-center">
                <Star className="mr-2 h-4 w-4 opacity-70" />
                <Badge variant="outline">{repo.stargazers_count}</Badge>
              </span>

            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>

  )
}