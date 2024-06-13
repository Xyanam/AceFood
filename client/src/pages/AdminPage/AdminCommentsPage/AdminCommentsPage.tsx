import { Ban, Check, UserX } from "lucide-react";
import classes from "./AdminCommentsPage.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axiosClient from "@/http/axios-client";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import CommentService from "@/services/CommentService";
import { cn } from "@/lib/utils";

const AdminCommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosClient.get("/getReportComments").then((resp) => {
      setComments(resp.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <h1 className="mx-auto mt-10 text-2xl">Загрузка...</h1>;

  const handleDeleteFromReport = (id: string) => {
    axiosClient.post("/deleteFromReport", { id }).then(() =>
      axiosClient.get("/getReportComments").then((resp) => {
        setComments(resp.data);
      })
    );
  };

  const handleDeleteComment = (commentId: string, id: number) => {
    handleDeleteFromReport(id);
    axiosClient.post("deleteComment", { id: commentId });
  };

  const handleDeleteAllCommentsUser = (userId: string) => {
    axiosClient.post("/deleteUserComments", { user_id: userId }).then(() => {
      axiosClient.get("/getReportComments").then((resp) => setComments(resp.data));
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>Модерация комментариев</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Автор</TableHead>
              <TableHead>Рецепт</TableHead>
              <TableHead>Причина</TableHead>
              <TableHead>Текст комментария</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.length > 0 ? (
              comments.reverse().map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell className="font-medium">
                    <Link to={`/profile/${comment.user_id}`} className="hover:underline">
                      {comment.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/recipe/${comment.recipe_id}`} className="hover:underline">
                      {comment.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <p>{comment.reason}</p>
                  </TableCell>

                  <TableCell className="max-w-96">
                    <p className="line-clamp-1">{comment.text}</p>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="space-x-3 lg:space-y-0 space-y-2">
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              className="bg-green-500 hover:bg-green-500/70"
                              size="icon"
                              onClick={() => handleDeleteFromReport(comment.id)}>
                              <Check />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Отклонить жалобу</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              className="bg-red-500 hover:bg-red-500/70"
                              size="icon"
                              onClick={() => handleDeleteComment(comment.comment_id, comment.id)}>
                              <Ban />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Удалить комментарий</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              className="bg-red-500 hover:bg-red-500/70"
                              size="icon"
                              onClick={() => handleDeleteAllCommentsUser(comment.user_id)}>
                              <UserX />
                            </Button>
                            <TooltipContent>
                              <p>Удалить все комментарии пользователя</p>
                            </TooltipContent>
                          </TooltipTrigger>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Жалоб нет
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCommentsPage;
