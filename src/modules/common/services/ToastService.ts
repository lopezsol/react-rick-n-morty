import type { ToastMessage } from "primereact/toast";

export class ToastService {
  private static toastRef: React.RefObject<any> | null = null;

  static register(toast: React.RefObject<any>) {
    this.toastRef = toast;
  }

  static show(
    severity: 'success' | 'info' | 'warn' | 'error',
    summary: string,
    detail: string,
    life: number = 3000
  ) {
    if (!this.toastRef?.current) {
      console.warn('ToastService: Toast no registrado aún.');
      return;
    }

    const message: ToastMessage = { severity, summary, detail, life };
    this.toastRef.current.show(message);
  }

  public static showSuccess(detail: string, life?: number) {
    this.show('success', "Éxito", detail, life);
  }

  public static showWarning(detail: string, life?: number) {
    this.show('warn', "Advertencia", detail, life);
  }

  public static showError(detail: string, life?: number) {
    this.show('error', "Error", detail, life);
  }

  public static showInfo(detail: string, life?: number) {
    this.show('info', "Información", detail, life);
  }
}