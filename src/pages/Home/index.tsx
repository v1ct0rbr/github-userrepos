import axios from 'axios';
import { EyeIcon, Github, HomeIcon, Search, User } from 'lucide-react';
import { useEffect, useState } from 'react';
// import { logogithub } from '@/assets/gitlogo.svg'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";


import { MyHoverCard } from '@/components/MyHoverCard';
import { MyPagination } from '@/components/MyPagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup } from '@/components/ui/toggle-group';
import { zodResolver } from "@hookform/resolvers/zod";
import { ToggleGroupItem } from '@radix-ui/react-toggle-group';
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { z } from "zod";




export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: "Java" | "PHP" | "Javascript" | "Python";
  private: boolean
  created_at: Date,
  updated_at: Date,
  homepage: string,

}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Usuário deve ter no mínimo 2 dígitos",
  }),
  quantityPerPage: z.coerce.number()
    .min(5, { message: "quantidade por página deve ser maior ou igual a 5" })
    .max(30, { message: 'Quantidade por página deve ser menor ou igua a 30' })
})


const DEFAULT_PAGE_LENGTH = 15;

export function Home() {
  // const [currentRepository, setCurrentRepository] = useState<Repository>({} as Repository)
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [avatar, setAvatar] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState("");

  const [perPage, setPerPage] = useState(DEFAULT_PAGE_LENGTH);
  const [isLastPage, setIsLastPage] = useState(false);


  useEffect(() => {
    fetchGitHubRepos(currentUser, perPage);
  }, [currentPage])

  useEffect(() => {
    setIsLastPage(repositories.length < perPage)
  }, [repositories])


  const fetchGitHubRepos = async (name: string, quantityPerPage: number) => {
    const qPage = quantityPerPage != perPage ? quantityPerPage : perPage;
    const qName = name != currentUser ? name : currentUser

    if (qPage && qName) {
      const apiUrl = `https://api.github.com/users/${qName}/repos?per_page=${qPage}&page=${currentPage}`;

      try {
        const response = await axios.get<Repository[]>(apiUrl);
        setRepositories(response.data);
        setAvatar(`https://github.com/${name}.png`);
      } catch (error) {
        toast.warning("Atenção", {
          description: "Usuário não encontrado",
        });
        setAvatar('');
        setRepositories([]);
      }
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      quantityPerPage: DEFAULT_PAGE_LENGTH
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setCurrentUser(values.username);
    setPerPage(values.quantityPerPage);
    setCurrentPage(1);
    values.username && fetchGitHubRepos(values.username, values.quantityPerPage);

  }

  function handlePreviousPage() {
    currentPage !== 1 && setCurrentPage((state) => state - 1);
  }

  function handleNextPage() {
    console.log(isLastPage)
    !isLastPage && setCurrentPage((state) => state + 1);
  }


  return (

    <div className='flex flex-col gap-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-0 flex flex-row">
          <Card className='w-full '>

            <CardContent className='p-0 pr-2'>

              <div className='grid grid-cols-1 md:grid-cols-2 flex-row items-center gap-3 justify-between'>
                <div className='grid grid-cols-2'>
                  <div className=' h-20 flex items-center justify-center'>
                    {avatar ? (<div className='flex '><Avatar>
                      <AvatarImage src={avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>  <div className='flex flex-col items-center justify-center'>
                    <h2 className='font-bold text-nowrap'>Usuário atual:</h2>
                    <a href={`https://github.com/${currentUser}`} target='_blank'>
                      <h3 className='italic underline'>{currentUser}</h3>
                    </a></div></div>) : <User size={50}></User>}
                   

                  
                
                  </div>
                </div>
                <div className='flex flex-row gap-3 space-y-0'>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>

                        <FormControl >
                          <Input placeholder="GIT USER" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField control={form.control}
                    name="quantityPerPage"
                    render={({ field }) => (

                      <FormItem>

                        <FormControl>
                          <Input type="number" step={5} {...field} />

                        </FormControl>
                        <FormMessage />

                      </FormItem>
                    )}
                  />

                  <FormControl>
                    <Button className='flex items-center justify-center gap-3' type="submit"><Search /></Button>
                  </FormControl>
                </div>
               
              </div>

            </CardContent>

          </Card>
        </form>
      </Form>


      <Card className='p-0'>
        <CardContent className='p-0'>
          <MyPagination
            currentPage={currentPage}
            isLastPage={isLastPage}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage} />
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        {repositories.map((item) => {
          return (
            <Card className='flex flex-col col-span-1 justify-between'>
              <CardHeader>
                <CardTitle className='overflow-x-clip'> {item.name}</CardTitle>
                <CardDescription className='text-ellipsis'>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                Liguagem: {item.language}
              </CardContent>
              <CardFooter className='flex flex-col items-start'>
                <Separator className='mb-4 w-full' />
                <ToggleGroup type="multiple">
                  <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <a target='_blank' href={item.html_url}><Github size={20} /></a>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <MyHoverCard repo={item} >
                      <EyeIcon size={20} />
                    </MyHoverCard>
                  </ToggleGroupItem>
                  {item.homepage && <ToggleGroupItem value='italic'>
                   <a target='_blank' href={`http://${item.homepage}`}><HomeIcon size={20} /></a>
                  </ToggleGroupItem>}
                  


                </ToggleGroup>

              </CardFooter>
            </Card>

          )
        })}
      </div>
    </div>
  )

}