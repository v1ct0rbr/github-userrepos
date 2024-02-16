import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger
} from "@/components/ui/menubar"
  
  export function MenubarDemo() {
    return (
      <Menubar className="w-full rounded-none fixed top-0">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem > 
              Clear <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
          
           
          </MenubarContent>
        </MenubarMenu>
        
       
       
      </Menubar>
    )
  }
  