import { Component, createSignal, Show } from 'solid-js';
import { Container, Button } from '../components';
import { useI18n } from '../i18n';

interface UploadResponse {
  code: number;
  status: string;
  message: string;
  data?: {
    file_name: string;
    start_url: string;
    config_key_hash?: string;
  };
}

const Upload: Component = () => {
  const { t } = useI18n();
  
  const [redeemCode, setRedeemCode] = createSignal('');
  const [fileName, setFileName] = createSignal('');
  const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
  const [isDragging, setIsDragging] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal('');
  const [success, setSuccess] = createSignal<UploadResponse['data'] | null>(null);
  
  const [errors, setErrors] = createSignal({
    redeemCode: '',
    fileName: '',
    file: '',
  });

  // API Base URL - adjust based on your environment
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  /**
   * Simple XOR encryption for web token
   * This matches the backend's decryptAuthVerify function
   */
  const generateWebToken = (): string => {
    const salt = import.meta.env.VITE_AUTH_SALT || 'default-salt-key';
    const data = 'WhatIsThisEvenDoingHereJustGoAway';
    
    const generateEncryptionKey = (salt: string): string => {
      let key = salt;
      while (key.length < 32) {
        key += salt;
      }
      return key.substring(0, 32);
    };

    const key = generateEncryptionKey(salt);
    
    let ciphertext = '';
    for (let i = 0; i < data.length; i++) {
      const charCode = data.charCodeAt(i);
      const keyCharCode = key.charCodeAt(i % key.length);
      const encryptedCharCode = (charCode ^ keyCharCode) + (i % 15);
      ciphertext += String.fromCharCode(encryptedCharCode);
    }

    const keyHash = btoa(Array.from(new TextEncoder().encode(key)).reduce((acc, byte) => acc + byte.toString(), ''));
    return btoa(salt + ':' + keyHash.substring(0, 12) + ':' + ciphertext);
  };

  const validateForm = (): boolean => {
    const newErrors = {
      redeemCode: '',
      fileName: '',
      file: '',
    };

    if (!redeemCode().trim()) {
      newErrors.redeemCode = t().upload.redeemCodeError;
    }

    if (!fileName().trim()) {
      newErrors.fileName = t().upload.fileNameError;
    }

    if (!selectedFile()) {
      newErrors.file = t().upload.fileError;
    } else if (!selectedFile()?.name.endsWith('.seb')) {
      newErrors.file = t().upload.fileTypeError;
    }

    setErrors(newErrors);
    return !newErrors.redeemCode && !newErrors.fileName && !newErrors.file;
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      if (file.name.endsWith('.seb')) {
        setSelectedFile(file);
        setErrors(prev => ({ ...prev, file: '' }));
      } else {
        setErrors(prev => ({ ...prev, file: t().upload.fileTypeError }));
      }
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files[0] || null;
    handleFileSelect(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile()!);
      formData.append('file_name', fileName());
      formData.append('redeem_code', redeemCode());

      const response = await fetch(`${API_BASE_URL}/service/safe-exam-bypasser`, {
        method: 'POST',
        headers: {
          'x-web-token': generateWebToken(),
        },
        body: formData,
      });

      const result: UploadResponse = await response.json();

      if (result.code === 200 && result.data) {
        setSuccess(result.data);
      } else {
        setError(result.message || 'An error occurred');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyUrl = async () => {
    if (success()?.start_url) {
      try {
        await navigator.clipboard.writeText(success()!.start_url);
      } catch {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = success()!.start_url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    }
  };

  const handleReset = () => {
    setRedeemCode('');
    setFileName('');
    setSelectedFile(null);
    setSuccess(null);
    setError('');
    setErrors({ redeemCode: '', fileName: '', file: '' });
  };

  return (
    <div class="min-h-screen py-20">
      <Container>
        <div class="max-w-xl mx-auto">
          {/* Header */}
          <div class="text-center mb-10">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {t().upload.title}
            </h1>
            <div class="w-16 h-1 bg-primary-500 mx-auto rounded-full mb-4" />
            <p class="text-gray-500">
              {t().upload.subtitle}
            </p>
          </div>

          {/* Success State */}
          <Show when={success()}>
            <div class="card-base p-8 text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">{t().upload.successTitle}</h2>
              <p class="text-gray-500 mb-6">{t().upload.successMessage}</p>
              
              {/* URL Display */}
              <div class="bg-gray-50 rounded-xl p-4 mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2 text-left">Start URL</label>
                <div class="flex items-center gap-2">
                  <input
                    type="text"
                    value={success()?.start_url || ''}
                    readonly
                    class="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm"
                  />
                  <button
                    onClick={handleCopyUrl}
                    class="px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* File Name Display */}
              <Show when={success()?.file_name}>
                <div class="bg-gray-50 rounded-xl p-4 mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2 text-left">File Name</label>
                  <p class="text-gray-900 text-left">{success()?.file_name}</p>
                </div>
              </Show>

              <Button onClick={handleReset} variant="outline" class="w-full">
                {t().upload.backBtn}
              </Button>
            </div>
          </Show>

          {/* Upload Form */}
          <Show when={!success()}>
            <form onSubmit={handleSubmit} class="card-base p-8">
              {/* Error Alert */}
              <Show when={error()}>
                <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-red-700 text-sm">{error()}</p>
                  </div>
                </div>
              </Show>

              {/* Redeem Code Input */}
              <div class="mb-5">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {t().upload.redeemCodeLabel}
                </label>
                <input
                  type="text"
                  value={redeemCode()}
                  onInput={(e) => {
                    setRedeemCode(e.currentTarget.value);
                    setErrors(prev => ({ ...prev, redeemCode: '' }));
                  }}
                  placeholder={t().upload.redeemCodePlaceholder}
                  class={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                    errors().redeemCode ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
                  }`}
                />
                <Show when={errors().redeemCode}>
                  <p class="mt-1.5 text-sm text-red-500">{errors().redeemCode}</p>
                </Show>
              </div>

              {/* File Name Input */}
              <div class="mb-5">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {t().upload.fileNameLabel}
                </label>
                <input
                  type="text"
                  value={fileName()}
                  onInput={(e) => {
                    setFileName(e.currentTarget.value);
                    setErrors(prev => ({ ...prev, fileName: '' }));
                  }}
                  placeholder={t().upload.fileNamePlaceholder}
                  class={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                    errors().fileName ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
                  }`}
                />
                <Show when={errors().fileName}>
                  <p class="mt-1.5 text-sm text-red-500">{errors().fileName}</p>
                </Show>
              </div>

              {/* File Upload Area */}
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {t().upload.fileLabel}
                </label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  class={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                    isDragging()
                      ? 'border-primary-500 bg-primary-50'
                      : errors().file
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 hover:border-primary-300 hover:bg-primary-50/50'
                  }`}
                >
                  <input
                    type="file"
                    accept=".seb"
                    onChange={(e) => handleFileSelect(e.currentTarget.files?.[0] || null)}
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <Show when={!selectedFile()}>
                    <div class="space-y-3">
                      <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto">
                        <svg class="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </div>
                      <div>
                        <p class="text-gray-700 font-medium">{t().upload.dragDropText}</p>
                        <p class="text-gray-500 text-sm mt-1">{t().upload.orText}</p>
                      </div>
                      <span class="inline-block px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700">
                        {t().upload.chooseFile}
                      </span>
                      <div class="text-xs text-gray-400 space-y-1">
                        <p>{t().upload.supportedFormat}</p>
                        <p>{t().upload.maxFileSize}</p>
                      </div>
                    </div>
                  </Show>

                  <Show when={selectedFile()}>
                    <div class="flex items-center justify-center gap-3">
                      <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div class="text-left">
                        <p class="text-gray-900 font-medium">{selectedFile()?.name}</p>
                        <p class="text-gray-500 text-sm">
                          {((selectedFile()?.size || 0) / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                        }}
                        class="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </Show>
                </div>
                <Show when={errors().file}>
                  <p class="mt-1.5 text-sm text-red-500">{errors().file}</p>
                </Show>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="accent"
                disabled={isLoading()}
                class="w-full !py-4"
              >
                <Show when={isLoading()} fallback={
                  <>
                    <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    {t().upload.submitBtn}
                  </>
                }>
                  <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t().upload.submitting}
                </Show>
              </Button>
            </form>
          </Show>
        </div>
      </Container>
    </div>
  );
};

export default Upload;
