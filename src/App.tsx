import axios from 'axios';
import { Link } from 'lucide-react';
import { useEffect, useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from 'sonner';

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

function App() {
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
    values.username &&   fetchGitHubRepos(values.username);

  }


  return (
    <div>
      <div className='flex justify-center items-center'>
      {avatar && <img width={50} height={50} src={avatar}/>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-0 flex flex-row">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className=''>

                <FormControl>
                  <Input placeholder="GIT USER" {...field} />
                 
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              id
            </TableHead>
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
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell><a target='_blank' href={item.html_url}><Link></Link></a></TableCell>


              </TableRow>
            )
          })}
        </TableBody>
      </Table>

    </div>
  )
}

export default App
