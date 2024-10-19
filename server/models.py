from django.db import models
from django.utils.translation import gettext as _


class Users(models.Model):
    email = models.CharField(max_length=100, verbose_name="Почта пользователя")
    password = models.CharField(max_length=50, verbose_name="Пароль")

class Subsidiary(models.Model):
    city = models.CharField(max_length=100, verbose_name="Город")
    adresss = models.CharField(max_length=300, verbose_name="Адрес")
    phone = models.CharField(max_length=20, verbose_name="Телефон")

class Teachers(models.Model):
    photo = models.ImageField(upload_to="images/teachers/", verbose_name="Фото")
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
    image = models.ImageField(upload_to="images/masterclass/", verbose_name="Изображение")
    date = models.DateField(verbose_name="Дата проведения")
    time = models.TimeField(verbose_name="Время проведения")

class Tariffs(models.Model):
    masterClass = models.ForeignKey(MasterClass, on_delete=models.CASCADE, verbose_name="Мастер-класс")
    name = models.CharField(max_length=100, verbose_name="Название тарифа")
    price = models.FloatField(verbose_name="Стоимость")



class Profile(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, unique=True, verbose_name="Пользователь")
    lastname = models.CharField(max_length=30, verbose_name="Фамилия")
    name = models.CharField(max_length=30, verbose_name="Имя")
    photo = models.ImageField(upload_to="images/profile/", verbose_name="Аватарка")
    phone = models.CharField(max_length=20, verbose_name="Телефон")



class Status(models.TextChoices):
    BOOKING = "BOOKING", _('ЗАБРОНИРОВАН')
    СANCELED = "СANCELED", _('ОТМЕНЕН')
    FINISHED = "FINISHED", _('ОКОНЧЕН')
    

class Records(models.Model):
    date = models.DateField(verbose_name="Дата записи")
    status = models.CharField(choices=Status.choices, verbose_name="Статус", max_length=200)

class Report(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, verbose_name="Пользователь")
    teacher = models.ForeignKey(Teachers, on_delete=models.CASCADE, verbose_name="Преподаватель")
    date = models.DateField(verbose_name="Дата формирования отчета")

class UserWorks(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, verbose_name="Пользователь")
    image = models.ImageField(upload_to="images/works/", verbose_name="Изображения")
    text = models.CharField(max_length=30, verbose_name="Подпись")
    date = models.DateField(verbose_name="Дата публикации")
    time = models.TimeField(verbose_name="Время публикации")

class Views(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, verbose_name="Пользователь")
    teacher = models.ForeignKey(Teachers, on_delete=models.CASCADE, verbose_name="Преподаватель")
    grade = models.IntegerField(verbose_name="Оценка")
    text = models.CharField(max_length=300, verbose_name="Текст отзыва")