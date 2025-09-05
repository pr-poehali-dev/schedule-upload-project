import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [hasSchedule, setHasSchedule] = useState(false);

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
                      <p className="text-2xl font-bold text-gray-900">0</p>
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
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Расписание занятий</h2>
                  <p className="text-gray-600">Управление расписанием для группы 7Т1</p>
                </div>
                <Button 
                  onClick={() => setHasSchedule(true)}
                  className="shrink-0"
                >
                  <Icon name="Edit" className="w-4 h-4 mr-2" />
                  Изменить расписание
                </Button>
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
                      <Button variant="outline" className="justify-start">
                        <Icon name="Plus" className="w-4 h-4 mr-2" />
                        Добавить занятие
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Icon name="Calendar" className="w-4 h-4 mr-2" />
                        Календарный вид
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Icon name="Download" className="w-4 h-4 mr-2" />
                        Экспорт расписания
                      </Button>
                      <Button variant="outline" className="justify-start">
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
                          <Button variant="outline" size="sm">
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
                          <Button variant="outline" size="sm">
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
                        <div className="text-2xl font-bold text-primary">0</div>
                        <div className="text-xs text-gray-600">Всего занятий</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">0</div>
                        <div className="text-xs text-gray-600">Проведено</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">0</div>
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

              {/* Состояние пустого расписания */}
              {!hasSchedule && (
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
                      <Button>
                        <Icon name="Plus" className="w-4 h-4 mr-2" />
                        Добавить занятие
                      </Button>
                      <Button variant="outline">
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
      </div>
    </div>
  );
};

export default Index;