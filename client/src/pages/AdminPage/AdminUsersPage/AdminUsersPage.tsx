import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Ban, Check, UserRoundMinus, UserX } from "lucide-react";
import classes from "./AdminUsersPage.module.css";
import { useEffect, useState } from "react";
import axiosClient from "@/http/axios-client";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [bannedUsers, setBannedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [tab, setTab] = useState("users");
  const [reasonValue, setReasonValue] = useState("");
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axiosClient.get("/users").then((resp) => {
      setUsers(resp.data);
      setIsLoading(false);
    });

    axiosClient.get("/bannedUsers").then((resp) => setBannedUsers(resp.data));
  }, []);

  const handleBanUser = (userId: string, reason: string) => {
    axiosClient.post("/banUser", { user_id: userId, banned: 1, reason }).then(() => {
      axiosClient.get("/users").then((resp) => setUsers(resp.data));
      axiosClient.get("/bannedUsers").then((resp) => setBannedUsers(resp.data));
      setIsOpenDialog(false);
      setReasonValue("");
    });
  };

  const handleUnbanUser = (userId: string) => {
    axiosClient.post("/banUser", { user_id: userId, banned: 0, reason: "" }).then(() => {
      axiosClient.get("/users").then((resp) => setUsers(resp.data));
      axiosClient.get("/bannedUsers").then((resp) => setBannedUsers(resp.data));
    });
  };

  let searchingUsers = users.filter(
    (f) => f.name.toLowerCase().includes(searchValue.toLowerCase()) && f.role !== "admin"
  );

  if (isLoading) return <h1 className="mx-auto mt-10 text-2xl">Загрузка...</h1>;

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>Модерация пользователей</h2>
        </div>
        <Tabs defaultValue="users" value={tab} onValueChange={setTab}>
          <div className="flex justify-between md:flex-row flex-col gap-5">
            <TabsList>
              <TabsTrigger value="users" className="text-[12px]">
                Пользователи
              </TabsTrigger>
              <TabsTrigger value="banned" className="relative text-[12px]">
                Заблокированные пользователи{" "}
                {bannedUsers.length > 0 && (
                  <span className="bg-red-500 w-5 h-5 rounded-full text-white flex justify-center items-center absolute -top-1 -right-2">
                    {bannedUsers.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            {tab === "users" && (
              <Input
                className="w-80"
                placeholder="Поиск..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            )}
          </div>
          <TabsContent value="users" className={cn(classes.recipes, "w-full")}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Логин</TableHead>
                  <TableHead className="w-[400px]">Email</TableHead>
                  <TableHead>Аватар</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchingUsers.length > 0 ? (
                  searchingUsers.map((user) => (
                    <TableRow>
                      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Блокировка пользователя</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right font-comforta font-bold">
                                Причина блокировки
                              </Label>
                              <Input
                                id="name"
                                placeholder="Нарушение"
                                className="col-span-3 placeholder:font-comforta"
                                value={reasonValue}
                                onChange={(e) => setReasonValue(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              className="bg-[#e97c94] hover:bg-[#e97c94]/80"
                              onClick={() => handleBanUser(selectedUserId, reasonValue)}>
                              Заблокировать
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <TableCell className="font-medium">
                        <Link to={`/profile/${user.id}`} className="hover:underline">
                          {user.name}
                        </Link>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <img
                          src={`data:image/png;base64,${user.image}`}
                          alt="avatar"
                          className="w-16 h-16 object-cover rounded-sm"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="space-x-3">
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button
                                  className="bg-red-500 hover:bg-red-500/70"
                                  size="icon"
                                  onClick={() => {
                                    setIsOpenDialog(true);
                                    setSelectedUserId(user.id);
                                  }}>
                                  <Ban />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Заблокировать пользователя</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Пользователей нет
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="banned" className={cn(classes.recipes, "w-full")}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Логин</TableHead>
                  <TableHead className="w-[400px]">Email</TableHead>
                  <TableHead>Аватар</TableHead>
                  <TableHead>Причина</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bannedUsers.length > 0 ? (
                  bannedUsers.map((user) => (
                    <TableRow>
                      <TableCell className="font-medium">
                        <Link to={`/profile/${user.id}`} className="hover:underline">
                          {user.name}
                        </Link>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <img
                          src={`data:image/png;base64,${user.image}`}
                          alt="avatar"
                          className="w-16 h-16 object-cover rounded-sm"
                        />
                      </TableCell>
                      <TableCell>{user.reason}</TableCell>
                      <TableCell className="text-right">
                        <div className="space-x-3">
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button
                                  className="bg-green-500 hover:bg-green-500/70"
                                  size="icon"
                                  onClick={() => handleUnbanUser(user.id)}>
                                  <UserRoundMinus />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-center text-sm">Разблокировать пользователя</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Заблокированных пользователей нет
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminUsersPage;
