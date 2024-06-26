<template>
  <Calendar
    :planList="planList"
    ref="calendarRef"
    :calendarWidth="650"
    @getCurrentDay="getCurrentDay"
  >
    <template #calendarDay="{ width }">
      <view class="slotDayBox">
        <!-- weekDay是获取今天是周几，就在前面填补几个空白 -->
        <view
          :style="[{ width: width + 'px', height: width + 'px' }]"
          v-for="item in weekDay"
          :key="item"
        >
          <view>
            <view
              class="calendar-every-day"
              :style="[
                { width: width * 0.7 + 'px', height: width * 0.7 + 'px' },
              ]"
            >
            </view>
          </view>
        </view>
        <!--planList 是获取到的数据真正展示的内容 -->
        <view
          :style="[{ width: width + 'px', height: width + 'px' }]"
          v-for="(obj, key) in planList"
          :key="obj.id"
        >
          <view class="calendar-every-day-box">
            <view
              @click="checkInsReport(obj)"
              class="calendar-every-day"
              :class="[obj.status ? 'special-text' : '']"
              :style="[
                {
                  width: width * 0.7 + 'px',
                  height: width * 0.7 + 'px',
                  background: textColor[obj.status],
                },
              ]"
            >
              {{
                key.split("-")[2] >= 10
                  ? key.split("-")[2]
                  : key.split("-")[2][1]
              }}
            </view>
            <text class="tag-text" :style="{ color: textColor[obj.status] }">
              {{ obj.status ? planStatus[obj.status] : planStatus[4] }}
            </text>
          </view>
        </view>
      </view>
    </template>
  </Calendar>
</template>
