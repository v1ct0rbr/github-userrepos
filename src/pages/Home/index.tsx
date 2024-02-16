import axios from 'axios';
import { Link, Search, User } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
  CardHeader
} from "@/components/ui/card";


import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { z } from "zod";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string;
  private: boolean
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const defaultUsername = 'v1ct0rbr';


export function Home() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [avatar, setAvatar] = useState("");



  useEffect(() => {
    fetchGitHubRepos(defaultUsername);
  }, [])


  const fetchGitHubRepos = async (name: string) => {

    const apiUrl = `https://api.github.com/users/${name}/repos`;
    console.log(apiUrl);

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
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: defaultUsername,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    values.username && fetchGitHubRepos(values.username);


  }


  return (
    <div>
        <div className='mb-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-0 flex flex-row">
            <Card className='w-full '>
              
              <CardContent className='p-3'>


                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center gap-3 space-y-0'>
                      <FormControl className=' w-20 h-20'>
                        {avatar ? (<Avatar>
                          <AvatarImage src={avatar} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>) : <User size={50}></User>}


                      </FormControl>

                      <FormControl className='border-l-2'>
                        <Input placeholder="GIT USER" {...field} />

                      </FormControl>
                      <FormControl>
                        <Button className='flex items-center justify-center gap-3' type="submit"><Search /></Button>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />



              </CardContent>

            </Card>
          </form>
        </Form>
        </div>
      
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <h2>Lista de repositórios</h2>
          <span>Quant.: {repositories.length}</span>
        </CardHeader>
        <CardContent>
          <Table className='border-2'>
            <TableHeader>
              <TableRow>

                <TableHead>
                  Name
                </TableHead>
                <TableHead>
                  description
                </TableHead>
                <TableHead>
                  link
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {repositories.map((item) => {
                return (
                  <TableRow key={item.id}>

                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell><a target='_blank' href={item.html_url}><Link></Link></a></TableCell>


                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  )

}