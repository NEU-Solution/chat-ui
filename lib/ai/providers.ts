import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { createOpenAI, openai } from '@ai-sdk/openai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';


const qwen = createOpenAI({
  compatibility: 'strict',
  name: 'evaluate',
  baseURL: 'https://45c3-14-0-20-159.ngrok-free.app/v1',
  apiKey: 'm_a',
});


export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': qwen('evaluate'),
        'chat-model-reasoning': wrapLanguageModel({
          model: qwen('evaluate'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': qwen('evaluate'),
        'artifact-model':qwen('evaluate'),
      },

    });
