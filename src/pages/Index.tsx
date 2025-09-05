import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Lesson {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  time: string;
  type: 'лекция' | 'практика' | 'лабораторная';
  date: string;
}

const Index = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentTab, setCurrentTab] = useState("home");
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [newLesson, setNewLesson] = useState({
    subject: '',
    teacher: '',
    room: '',
    time: '',
    type: 'лекция' as const,
    date: ''
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const fileNames = files.map(file => file.name);
    setUploadedFiles(prev => [...prev, ...fileNames]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileNames = files.map(file => file.name);
    setUploadedFiles(prev => [...prev, ...fileNames]);
  };

  const addLesson = () => {
    if (newLesson.subject && newLesson.teacher && newLesson.room && newLesson.time && newLesson.date) {
      const lesson: Lesson = {
        id: Date.now().toString(),
        ...newLesson
      };
      setLessons(prev => [...prev, lesson]);
      setNewLesson({
        subject: '',
        teacher: '',
        room: '',
        time: '',
        type: 'лекция',
        date: ''
      });
      setShowAddLesson(false);
    }
  };

  const clearAllSchedule = () => {
    setLessons([]);
  };

  const exportSchedule = () => {
    const data = JSON.stringify(lessons, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schedule-7T1.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'лекция': return 'bg-blue-100 text-blue-800';
      case 'практика': return 'bg-green-100 text-green-800';
      case 'лабораторная': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const todayLessons = lessons.filter(lesson => {
    const today = new Date().toISOString().split('T')[0];
    return lesson.date === today;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Calendar" className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Расписание 7Т1</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setCurrentTab("home")}
                className={currentTab === "home" ? "text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900 transition-colors"}
              >
                Главная
              </button>
              <button 
                onClick={() => setCurrentTab("schedule")}
                className={currentTab === "schedule" ? "text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900 transition-colors"}
              >
                Расписание
              </button>
              <button 
                onClick={() => setCurrentTab("upload")}
                className={currentTab === "upload" ? "text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900 transition-colors"}
              >
                Загрузить
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="home">Главная</TabsTrigger>
            <TabsTrigger value="schedule">Расписание</TabsTrigger>
            <TabsTrigger value="upload">Загрузить</TabsTrigger>
          </TabsList>

          {/* Главная страница */}
          <TabsContent value="home" id="home">
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="text-center py-12 px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                  <Icon name="GraduationCap" className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Добро пожаловать в группу 7Т1
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Современная система управления расписанием для нашей учебной группы. 
                  Быстрый доступ к актуальному расписанию и возможность загрузки обновлений.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8" onClick={() => setCurrentTab("schedule")}>
                    <Icon name="Eye" className="w-5 h-5 mr-2" />
                    Посмотреть расписание
                  </Button>
                  <Button variant="outline" size="lg" className="px-8" onClick={() => setCurrentTab("upload")}>
                    <Icon name="Upload" className="w-5 h-5 mr-2" />
                    Загрузить файл
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="flex items-center p-6">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Icon name="Clock" className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Занятий сегодня</p>
                      <p className="text-2xl font-bold text-gray-900">{todayLessons.length}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex items-center p-6">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Icon name="FileText" className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Загружено файлов</p>
                      <p className="text-2xl font-bold text-gray-900">{uploadedFiles.length}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Расписание */}
          <TabsContent value="schedule" id="schedule">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Расписание занятий</h2>
                  <p className="text-gray-600">Управление расписанием для группы 7Т1</p>
                </div>
                <Dialog open={showAddLesson} onOpenChange={setShowAddLesson}>
                  <DialogTrigger asChild>
                    <Button className="shrink-0">
                      <Icon name="Edit" className="w-4 h-4 mr-2" />
                      Изменить расписание
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Добавить занятие</DialogTitle>
                      <DialogDescription>Создайте новое занятие в расписании группы 7Т1</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Label htmlFor="subject">Предмет</Label>
                        <Input 
                          id="subject" 
                          value={newLesson.subject}
                          onChange={(e) => setNewLesson({...newLesson, subject: e.target.value})}
                          placeholder="Математика"
                        />
                      </div>
                      <div>
                        <Label htmlFor="teacher">Преподаватель</Label>
                        <Input 
                          id="teacher" 
                          value={newLesson.teacher}
                          onChange={(e) => setNewLesson({...newLesson, teacher: e.target.value})}
                          placeholder="Иванов И.И."
                        />
                      </div>
                      <div>
                        <Label htmlFor="room">Аудитория</Label>
                        <Input 
                          id="room" 
                          value={newLesson.room}
                          onChange={(e) => setNewLesson({...newLesson, room: e.target.value})}
                          placeholder="Аудитория 205"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="time">Время</Label>
                          <Input 
                            id="time" 
                            value={newLesson.time}
                            onChange={(e) => setNewLesson({...newLesson, time: e.target.value})}
                            placeholder="8:30-10:00"
                          />
                        </div>
                        <div>
                          <Label htmlFor="date">Дата</Label>
                          <Input 
                            id="date" 
                            type="date"
                            value={newLesson.date}
                            onChange={(e) => setNewLesson({...newLesson, date: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="type">Тип занятия</Label>
                        <Select value={newLesson.type} onValueChange={(value: 'лекция' | 'практика' | 'лабораторная') => setNewLesson({...newLesson, type: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="лекция">Лекция</SelectItem>
                            <SelectItem value="практика">Практика</SelectItem>
                            <SelectItem value="лабораторная">Лабораторная</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddLesson(false)}>Отмена</Button>
                      <Button onClick={addLesson}>Добавить</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Панель настройки */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Settings" className="w-5 h-5" />
                    <span>Панель управления</span>
                  </CardTitle>
                  <CardDescription>
                    Настройки и инструменты для управления расписанием группы
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Основные действия */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Основные действия</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <Button variant="outline" className="justify-start" onClick={() => setShowAddLesson(true)}>
                        <Icon name="Plus" className="w-4 h-4 mr-2" />
                        Добавить занятие
                      </Button>
                      <Button variant="outline" className="justify-start" onClick={() => setShowCalendar(true)}>
                        <Icon name="Calendar" className="w-4 h-4 mr-2" />
                        Календарный вид
                      </Button>
                      <Button variant="outline" className="justify-start" onClick={exportSchedule}>
                        <Icon name="Download" className="w-4 h-4 mr-2" />
                        Экспорт расписания
                      </Button>
                      <Button variant="outline" className="justify-start" onClick={clearAllSchedule}>
                        <Icon name="Trash2" className="w-4 h-4 mr-2" />
                        Очистить всё
                      </Button>
                    </div>
                  </div>

                  {/* Настройки уведомлений */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Уведомления</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon name="Bell" className="w-5 h-5 text-gray-500" />
                            <div>
                              <p className="font-medium text-sm">Напоминания о занятиях</p>
                              <p className="text-xs text-gray-500">За 15 минут до начала</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => setShowNotifications(true)}>
                            Настроить
                          </Button>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon name="Mail" className="w-5 h-5 text-gray-500" />
                            <div>
                              <p className="font-medium text-sm">Email уведомления</p>
                              <p className="text-xs text-gray-500">Об изменениях расписания</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => setShowEmail(true)}>
                            Настроить
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Статистика */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Статистика</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{lessons.length}</div>
                        <div className="text-xs text-gray-600">Всего занятий</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">0</div>
                        <div className="text-xs text-gray-600">Проведено</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{lessons.length}</div>
                        <div className="text-xs text-gray-600">Предстоит</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">0</div>
                        <div className="text-xs text-gray-600">Изменений</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Список занятий или пустое состояние */}
              {lessons.length > 0 ? (
                <div className="grid gap-4">
                  {lessons.map((lesson) => (
                    <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                          <div className="flex items-start space-x-4">
                            <div className="flex flex-col items-center bg-primary/10 rounded-lg p-3 min-w-[80px]">
                              <span className="text-xs font-medium text-primary">Время</span>
                              <span className="text-sm font-bold text-primary">{lesson.time}</span>
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-lg text-gray-900">{lesson.subject}</h3>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Icon name="MapPin" className="w-4 h-4" />
                                <span className="text-sm">{lesson.room}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Icon name="User" className="w-4 h-4" />
                                <span className="text-sm">{lesson.teacher}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Icon name="Calendar" className="w-4 h-4" />
                                <span className="text-sm">{lesson.date}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className={getTypeColor(lesson.type)}>{lesson.type}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Icon name="CalendarX" className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Расписание пусто</h3>
                    <p className="text-gray-600 text-center mb-6 max-w-sm">
                      Пока нет ни одного занятия. Начните с загрузки файла расписания или добавьте занятия вручную.
                    </p>
                    <div className="flex space-x-3">
                      <Button onClick={() => setShowAddLesson(true)}>
                        <Icon name="Plus" className="w-4 h-4 mr-2" />
                        Добавить занятие
                      </Button>
                      <Button variant="outline" onClick={() => setCurrentTab("upload")}>
                        <Icon name="Upload" className="w-4 h-4 mr-2" />
                        Загрузить файл
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Загрузка файлов */}
          <TabsContent value="upload" id="upload">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Загрузка расписания</h2>
                <p className="text-gray-600">Загрузите новый файл расписания для обновления</p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div 
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                      dragActive 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-4">
                      <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon name="Upload" className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          Перетащите файлы сюда или выберите
                        </p>
                        <p className="text-gray-600">Поддерживаются форматы: PDF, XLSX, DOC</p>
                      </div>
                      <div>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.xlsx,.xls,.doc,.docx"
                          onChange={handleFileInput}
                          className="hidden"
                          id="file-input"
                        />
                        <label htmlFor="file-input">
                          <Button asChild>
                            <span className="cursor-pointer">Выбрать файлы</span>
                          </Button>
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Загруженные файлы */}
              {uploadedFiles.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="CheckCircle" className="w-5 h-5 text-green-600" />
                      <span>Загруженные файлы</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {uploadedFiles.map((fileName, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Icon name="File" className="w-5 h-5 text-gray-500" />
                            <span className="text-sm font-medium text-gray-900">{fileName}</span>
                          </div>
                          <Badge variant="secondary">Загружено</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Диалог календарного вида */}
        <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Календарный вид</DialogTitle>
              <DialogDescription>Просмотр расписания в календарном формате</DialogDescription>
            </DialogHeader>
            <div className="py-4 text-center text-gray-500">
              <Icon name="Calendar" className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Календарный виджет будет добавлен в следующей версии</p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Диалог настройки уведомлений */}
        <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Настройки уведомлений</DialogTitle>
              <DialogDescription>Настройте напоминания о занятиях</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span>Уведомления включены</span>
                <Badge variant="secondary">Активно</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Время напоминания</span>
                <span>15 минут</span>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowNotifications(false)}>Готово</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Диалог настройки email */}
        <Dialog open={showEmail} onOpenChange={setShowEmail}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Email уведомления</DialogTitle>
              <DialogDescription>Настройте email для получения уведомлений об изменениях</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <Label htmlFor="email">Email адрес</Label>
                <Input id="email" placeholder="example@mail.com" />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="changes" />
                <Label htmlFor="changes">Уведомлять об изменениях расписания</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="new-lessons" />
                <Label htmlFor="new-lessons">Уведомлять о новых занятиях</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEmail(false)}>Отмена</Button>
              <Button onClick={() => setShowEmail(false)}>Сохранить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;