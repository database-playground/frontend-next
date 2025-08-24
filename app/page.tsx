import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Code, Database, Trophy, Users, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div
          className={`
            container mx-auto flex items-center justify-between px-4 py-4
          `}
        >
          <div className="flex items-center gap-3">
            <Logo className="size-8" />
            <div>
              <h1 className="font-heading text-xl font-bold text-foreground">資料庫練功房</h1>
              <p className="text-sm text-muted-foreground">Database Playground</p>
            </div>
          </div>
          <Button
            className={`
              bg-primary px-6 font-medium text-primary-foreground
              hover:bg-primary/90
            `}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            使用 Google 登入
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge
            variant="secondary"
            className={`mb-4 border-accent/20 bg-primary/10 text-primary`}
          >
            🚀 全新 AI 驅動學習體驗
          </Badge>
          <h2
            className={`
              mb-6 font-heading text-4xl font-bold text-foreground
              md:text-5xl
            `}
          >
            掌握 SQL 技能的
            <span className="text-primary">最佳練功房</span>
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            透過互動式練習、AI 教練指導和積分系統，讓學習資料庫變得更有趣且高效。
            無論你是初學者還是進階開發者，都能在這裡找到適合的挑戰。
          </p>
          <div
            className={`
              flex flex-col justify-center gap-4
              sm:flex-row
            `}
          >
            <Button
              size="lg"
              className={`
                bg-primary px-8 text-primary-foreground
                hover:bg-primary/90
              `}
            >
              立即開始練習
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-muted/30 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h3 className="mb-4 font-heading text-3xl font-bold text-foreground">為什麼選擇資料庫練功房？</h3>
            <p className="text-lg text-muted-foreground">我們提供完整的學習生態系統，讓你的 SQL 技能快速提升</p>
          </div>

          <div
            className={`
              grid gap-6
              md:grid-cols-2
              lg:grid-cols-3
            `}
          >
            {/* SQL Practice Block */}
            <Card
              className={`
                border-border transition-shadow
                hover:shadow-lg
              `}
            >
              <CardHeader>
                <div
                  className={`
                    mb-4 flex h-12 w-12 items-center justify-center rounded-lg
                    bg-primary/10
                  `}
                >
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl">線上 SQL 練習</CardTitle>
                <CardDescription>在瀏覽器中直接編寫和執行 SQL 查詢，支援多種資料庫引擎</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`
                    h-32 w-full rounded-lg bg-muted p-4 font-mono text-sm
                  `}
                  aria-label="SQL 編輯器介面"
                >
                </div>
              </CardContent>
            </Card>

            {/* AI Coach Block */}
            <Card
              className={`
                border-border transition-shadow
                hover:shadow-lg
              `}
            >
              <CardHeader>
                <div
                  className={`
                    mb-4 flex h-12 w-12 items-center justify-center rounded-lg
                    bg-primary/10
                  `}
                >
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl">AI 教練指導</CardTitle>
                <CardDescription>智能分析你的程式碼，提供個人化建議和最佳化提示</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        flex h-8 w-8 flex-shrink-0 items-center justify-center
                        rounded-full bg-primary
                      `}
                    >
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 rounded-lg bg-muted p-3">
                      <p className="text-sm">你的查詢可以透過加入索引來提升效能...</p>
                    </div>
                  </div>
                  <div
                    className={`
                      h-20 w-full rounded-lg bg-muted p-4 font-mono text-sm
                    `}
                    aria-label="AI 教練對話介面"
                  >
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Points System Block */}
            <Card
              className={`
                border-border transition-shadow
                hover:shadow-lg
              `}
            >
              <CardHeader>
                <div
                  className={`
                    mb-4 flex h-12 w-12 items-center justify-center rounded-lg
                    bg-primary/10
                  `}
                >
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl">積分獎勵系統</CardTitle>
                <CardDescription>完成挑戰獲得積分，解鎖新功能和專屬徽章</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">本週進度</span>
                    <Badge variant="secondary">1,250 分</Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-3/4 rounded-full bg-primary"></div>
                  </div>
                  <div
                    className={`
                      h-20 w-full rounded-lg bg-muted p-4 font-mono text-sm
                    `}
                    aria-label="成就徽章和進度條"
                  >
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Comparison */}
            <Card
              className={`
                border-border transition-shadow
                hover:shadow-lg
              `}
            >
              <CardHeader>
                <div
                  className={`
                    mb-4 flex h-12 w-12 items-center justify-center rounded-lg
                    bg-primary/10
                  `}
                >
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl">快速答案比較</CardTitle>
                <CardDescription>即時比對你的答案與標準解答，快速發現問題所在</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`
                    h-25 w-full rounded-lg bg-muted p-4 font-mono text-sm
                  `}
                  aria-label="答案比較介面"
                >
                </div>
              </CardContent>
            </Card>

            {/* Community */}
            <Card
              className={`
                border-border transition-shadow
                hover:shadow-lg
              `}
            >
              <CardHeader>
                <div
                  className={`
                    mb-4 flex h-12 w-12 items-center justify-center rounded-lg
                    bg-primary/10
                  `}
                >
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl">學習社群</CardTitle>
                <CardDescription>與其他學習者交流經驗，分享解題技巧和最佳實踐</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`
                    h-25 w-full rounded-lg bg-muted p-4 font-mono text-sm
                  `}
                  aria-label="學習社群討論區"
                >
                </div>
              </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card
              className={`
                border-border transition-shadow
                hover:shadow-lg
              `}
            >
              <CardHeader>
                <div
                  className={`
                    mb-4 flex h-12 w-12 items-center justify-center rounded-lg
                    bg-primary/10
                  `}
                >
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl">學習追蹤</CardTitle>
                <CardDescription>詳細學習分析報告，幫你了解強項和需要改進的地方</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`
                    h-25 w-full rounded-lg bg-muted p-4 font-mono text-sm
                  `}
                  aria-label="學習分析儀表板"
                >
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-3xl text-center">
          <h3 className="mb-4 font-heading text-3xl font-bold text-foreground">準備好開始你的 SQL 學習之旅了嗎？</h3>
          <p className="mb-8 text-lg text-muted-foreground">加入數千名學習者的行列，在資料庫練功房中提升你的技能</p>
          <Button
            size="lg"
            className={`
              bg-primary px-8 text-primary-foreground
              hover:bg-primary/90
            `}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            立即使用 Google 登入
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 px-4 py-8">
        <div className="container mx-auto text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Logo className="size-4" />
            <span className="font-heading font-semibold text-foreground">資料庫練功房</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 Database Playground. 讓學習資料庫變得更簡單、更有趣。</p>
        </div>
      </footer>
    </div>
  );
}
