import React, { useEffect, useState } from "react";
import classes from "./HelpPage.module.css";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const HelpPage = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
      toast.warning("Чтобы оставить отзыв, вам нужно авторизоваться!", {
        style: {
          fontSize: "18px",
          width: "400px",
        },
      });
    }
  }, [isAuth]);

  const EMAIL_PUBLIC_KEY = "DoGnai90V9hQy6lG-";
  const EMAIL_TEMPLATE_ID = "template_ua5503a";
  const EMAIL_SERVICE_ID = "service_f32hk6f";

  const handleSendEmail = () => {
    setIsLoading(true);
    emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, { message: value }, EMAIL_PUBLIC_KEY).then(
      (result) => {
        toast.success("Сообщение отправлено! Спасибо за обращение");
        setIsLoading(false);
        setValue("");
      },
      (error) => {
        console.log(error.text);
        setIsLoading(false);
      }
    );
  };
  return (
    <div className="w-full">
      <div className={classes.headerBlock}>
        <h1 className={classes.title}>Ваше мнение важно для нас!</h1>
        <div className="max-w-4xl">
          <p className="text-center">
            Мы постоянно стремимся улучшать качество наших услуг и ваш опыт использования нашего
            сайта. Если вы столкнулись с технической проблемой, обнаружили ошибку или желаете
            поделиться своими впечатлениями о работе сайта, мы приглашаем вас воспользоваться формой
            обратной связи ниже. Ваш отзыв поможет нам сделать сайт еще лучше и удобнее.
          </p>
          <p className="text-center mt-6">
            Пожалуйста, опишите в деталях любые проблемы, с которыми вы столкнулись, или
            предложения, которые у вас есть, и наша команда ознакомится с вашим сообщением в
            ближайшие сроки.
          </p>
        </div>
        <div className="lg:w-96 w-64 flex mx-auto mt-10 flex-col pb-10">
          <Textarea
            placeholder="Опишите проблему или пожелание"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            className="mt-2 bg-pink hover:bg-pink/70"
            onClick={handleSendEmail}
            disabled={isLoading}>
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
