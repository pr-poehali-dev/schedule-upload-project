import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Пример данных расписания
  const schedule = [
    {
      time: "8:30-10:00",
      subject: "Математика",
      room: "Аудитория 205",
      teacher: "Иванов И.И.",
      type: "лекция"
    },
    {
      time: "10:15-11:45",
      subject: "Физика",
      room: "Аудитория 301",
      teacher: "Петров П.П.",
      type: "практика"
    },
    {
      time: "12:00-13:30",
      subject: "Программирование",
      room: "Компьютерный класс 15",
      teacher: "Сидоров С.С.",
      type: "лабораторная"
    },
    {
      time: "14:00-15:30",
      subject: "Английский язык",
      room: "Аудитория 102",
      teacher: "Johnson M.",
      type: "практика"
    }
  ];

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'лекция': return 'bg-blue-100 text-blue-800';
      case 'практика': return 'bg-green-100 text-green-800';
      case 'лабораторная': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
              <a href="#home" className="text-gray-900 font-medium">Главная</a>
              <a href="#schedule" className="text-gray-600 hover:text-gray-900 transition-colors">Расписание</a>
              <a href="#upload" className="text-gray-600 hover:text-gray-900 transition-colors">Загрузить</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="home" className="w-full">
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
                  <Button size="lg" className="px-8">
                    <Icon name="Eye" className="w-5 h-5 mr-2" />
                    Посмотреть расписание
                  </Button>
                  <Button variant="outline" size="lg" className="px-8">
                    <Icon name="Upload" className="w-5 h-5 mr-2" />
                    Загрузить файл
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="flex items-center p-6">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Icon name="Clock" className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Занятий сегодня</p>
                      <p className="text-2xl font-bold text-gray-900">4</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex items-center p-6">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Icon name="Users" className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Студентов в группе</p>
                      <p className="text-2xl font-bold text-gray-900">25</p>
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
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Расписание занятий</h2>
                <p className="text-gray-600">Актуальное расписание для группы 7Т1</p>
              </div>

              <div className="grid gap-4">
                {schedule.map((lesson, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
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
                          </div>
                        </div>
                        <Badge className={getTypeColor(lesson.type)}>{lesson.type}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
      </div>
    </div>
  );
};

export default Index;