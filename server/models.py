import random
from django.db import models
from django.utils.translation import gettext as _

class Users(models.Model):
    email = models.CharField(max_length=100, verbose_name="Почта пользователя", unique=True)
    password = models.CharField(max_length=50, verbose_name="Пароль")

    def check_password(self, raw_password):
        return self.password == raw_password


class Subsidiary(models.Model):
    city = models.CharField(max_length=100, verbose_name="Город")
    adresss = models.CharField(max_length=300, verbose_name="Адрес")
    phone = models.CharField(max_length=20, verbose_name="Телефон")

class Teachers(models.Model):
    photo = models.ImageField(upload_to="server/images/teachers/", verbose_name="Фото")
    lastname = models.CharField(max_length=30, verbose_name="Фамилия")
    name = models.CharField(max_length=30, verbose_name="Имя")
    surname = models.CharField(max_length=30, verbose_name="Отчество")

class Сategories(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название категории")
    description = models.CharField(max_length=200, verbose_name="Описание")

class MasterClass(models.Model):
    subsidiary = models.ForeignKey(Subsidiary, on_delete=models.CASCADE, verbose_name="Филиал")
    teacher = models.ForeignKey(Teachers, on_delete=models.CASCADE, verbose_name="Преподаватель")
    сategories = models.ForeignKey(Сategories, on_delete=models.CASCADE, verbose_name="Категория")
    title = models.CharField(max_length=100, verbose_name="Заголовок")
    description = models.CharField(max_length=200, verbose_name="Описание")
    image = models.ImageField(upload_to="server/images/masterclass/", verbose_name="Изображение")
    date = models.DateField(verbose_name="Дата проведения")
    time = models.TimeField(verbose_name="Время проведения")

class Tariffs(models.Model):
    masterClass = models.ForeignKey(MasterClass, on_delete=models.CASCADE, verbose_name="Мастер-класс")
    name = models.CharField(max_length=100, verbose_name="Название тарифа")
    price = models.FloatField(verbose_name="Стоимость")


class Profile(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE,primary_key=True, verbose_name="Пользователь")
    lastname = models.CharField(max_length=30, verbose_name="Фамилия", blank=True, null=True)
    name = models.CharField(max_length=30, verbose_name="Имя", blank=True, null=True)
    photo = models.ImageField(upload_to="server/images/profile/", verbose_name="Аватарка", blank=True, null=True)
    phone = models.CharField(max_length=20, verbose_name="Телефон", blank=True, null=True)


class Status(models.TextChoices):
    BOOKING = "BOOKING", _('ЗАБРОНИРОВАН')
    СANCELED = "СANCELED", _('ОТМЕНЕН')
    FINISHED = "FINISHED", _('ОКОНЧЕН')
    
class Records(models.Model):
    masterClass = models.ForeignKey(MasterClass, on_delete=models.CASCADE, verbose_name="Мастер-класс")
    user = models.ForeignKey(Users, on_delete=models.CASCADE, verbose_name="Пользователь")
    date = models.DateField(verbose_name="Дата записи")
    status = models.CharField(choices=Status.choices, verbose_name="Статус", default=Status.BOOKING, max_length=200)
    number = models.IntegerField(unique=True,verbose_name="Номер брони")

    def save(self, *args, **kwargs):
        if not self.number:
            self.number = self.generate_unique_number()
        super().save(*args, **kwargs)

    @classmethod
    def generate_unique_number(cls):
        while True:
            number = random.randint(10000000, 99999999)
            if not cls.objects.filter(number=number).exists():
                return number


class Report(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, verbose_name="Пользователь")
    teacher = models.ForeignKey(Teachers, on_delete=models.CASCADE, verbose_name="Преподаватель")
    date = models.DateField(verbose_name="Дата формирования отчета")

class UserWorks(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, verbose_name="Пользователь")
    image = models.ImageField(upload_to="server/images/works/", verbose_name="Изображения")
    text = models.CharField(max_length=30, verbose_name="Подпись")
    date = models.DateField(verbose_name="Дата публикации")
    time = models.TimeField(verbose_name="Время публикации")

class Views(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, verbose_name="Пользователь")
    teacher = models.ForeignKey(Teachers, on_delete=models.CASCADE, verbose_name="Преподаватель")
    grade = models.IntegerField(verbose_name="Оценка")
    text = models.CharField(max_length=300, verbose_name="Текст отзыва")