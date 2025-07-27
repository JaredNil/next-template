import { useState } from 'react';

import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { ErrorBoundary } from '../../errorBoundary/error-boundary';

// Компонент, который может вызвать ошибку
const BuggyComponent = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Это тестовая ошибка для демонстрации ErrorBoundary!');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Тестовый компонент</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Этот компонент может вызвать ошибку для тестирования ErrorBoundary.</p>
        <Button 
          onClick={() => setShouldThrow(true)}
          variant="destructive"
        >
          Вызвать ошибку
        </Button>
      </CardContent>
    </Card>
  );
};

// Компонент с ErrorBoundary для демонстрации
export const ErrorTestPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Тест ErrorBoundary</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Компонент без ErrorBoundary:</h2>
          <BuggyComponent />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-3">Компонент с ErrorBoundary:</h2>
          <ErrorBoundary>
            <BuggyComponent />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

 