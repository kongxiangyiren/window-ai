<template>
  <div class="container ivu-p">
    <div class="dialog">
      <template v-for="(item, index) in dialogs" :key="index">
        <div
          class="dialog-item"
          :class="{ 'dialog-item-me': item.role === 'me', 'dialog-item-ai': item.role === 'ai' }"
        >
          <div class="dialog-item-main">{{ item.text }}</div>
        </div>
      </template>
    </div>
    <div class="question ivu-mt">
      <Input
        v-model="question"
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6 }"
        placeholder="输入你的问题"
      />
      <Row class="ivu-mt">
        <Col>
          <Button
            type="primary"
            size="large"
            icon="md-send"
            :disabled="disabled"
            :loading="loading"
            @click="handleSend"
          >
            发送
          </Button>
        </Col>
        <Col>
          <Button
            size="large"
            class="ivu-ml"
            icon="md-add"
            :disabled="loading || disabled"
            @click="handleNewChat"
          >
            新对话
          </Button>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  const question = ref('');
  const loading = ref(false);
  const dialogs = ref<
    Array<{
      id: number;
      role: 'me' | 'ai';
      text: string;
    }>
  >([]);
  const disabled = ref(true);
  // 创建一个会话进程
  const session = ref<Promise<AITextSession> | null>(null);

  onMounted(async () => {
    if (!window.ai) {
      console.log(
        '不支持AI功能, 请在支持AI功能的浏览器中打开,详情参考：https://github.com/kongxiangyiren/window-ai'
      );
      dialogs.value.push({
        id: dialogs.value.length + 1,
        role: 'ai',
        text: '不支持AI功能, 请在支持AI功能的浏览器中打开,详情参考：https://github.com/kongxiangyiren/window-ai'
      });
      return;
    }
    const availability = await window.ai.canCreateTextSession();
    if (availability === 'readily') {
      console.log('模型已经准备好了');
      session.value = window.ai.createTextSession();
      disabled.value = false;
    } else if (availability === 'after-download') {
      console.log('模型正在下载中');
      dialogs.value.push({
        id: dialogs.value.length + 1,
        role: 'ai',
        text: '模型正在下载中'
      });
      return;
    } else {
      console.log('模型还没下载,详情参考：https://github.com/kongxiangyiren/window-ai');
      dialogs.value.push({
        id: dialogs.value.length + 1,
        role: 'ai',
        text: '模型还没下载,详情参考：https://github.com/kongxiangyiren/window-ai'
      });
      return;
    }
  });

  async function handleSend() {
    if (loading.value || question.value === '') return;
    loading.value = true;

    const questionn = question.value;
    question.value = '';

    dialogs.value.push({
      id: dialogs.value.length + 1,
      role: 'me',
      text: questionn
    });

    const aiDialogID = dialogs.value.length + 1;

    dialogs.value.push({
      id: aiDialogID,
      role: 'ai',
      text: 'AI 思考中...'
    });

    const dialog = dialogs.value.find(item => item.id === aiDialogID);

    if (!session.value) {
      console.log('session 不存在');
      return;
    }

    console.log(dialogs.value, 'dialogs.value');

    const stream = (await session.value).promptStreaming(questionn);

    dialog!.text = '';

    let previousLength = 0;

    // @ts-expect-error
    for await (const chunk of stream) {
      const newContent = chunk.slice(previousLength);
      // console.log(newContent); // AI 的每次输出
      previousLength = chunk.length;

      dialog!.text += newContent;
    }
    console.log(dialog!.text); // 最终的 AI 回答（完整版）
    loading.value = false;
    return;
  }
  async function handleNewChat() {
    dialogs.value = [];
    if (!session.value) {
      console.log('session 不存在');
      return;
    }
    // 销毁当前会话
    (await session.value).destroy();
    // 创建新的会话
    session.value = window.ai.createTextSession();
  }
</script>

<style scoped>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .dialog {
    flex: 1;
    overflow: auto;
  }

  .dialog-item {
    display: flex;
  }

  .dialog-item-main {
    max-width: 80%;
    padding: 8px;
    word-wrap: break-word;
    margin-top: 16px;
    border-radius: 4px;
    /* 使用 \n 换行 */
    white-space: pre-wrap;
  }

  .dialog-item-me {
    justify-content: flex-end;
  }

  .dialog-item-me .dialog-item-main {
    background-color: antiquewhite;
  }

  .dialog-item-ai .dialog-item-main {
    background-color: #eee;
  }
  .logo {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }
</style>
