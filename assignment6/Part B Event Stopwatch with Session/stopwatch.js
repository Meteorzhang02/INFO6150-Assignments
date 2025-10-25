$(document).ready(function() {
    class Stopwatch {
        constructor() {
            this.startTime = 0;
            this.elapsedTime = 0;
            this.isRunning = false;
            this.intervalId = null;
        }

        async start() {
            if (this.isRunning) return;
            
            return new Promise((resolve) => {
                this.isRunning = true;
                this.startTime = Date.now() - this.elapsedTime;
                
                this.intervalId = setInterval(() => {
                    this.elapsedTime = Date.now() - this.startTime;
                    this.updateDisplay();
                }, 100);
                
                resolve();
            });
        }

        async pause() {
            if (!this.isRunning) return;
            
            return new Promise((resolve) => {
                clearInterval(this.intervalId);
                this.isRunning = false;
                resolve();
            });
        }

        async resume() {
            return this.start();
        }

        async stop() {
            return new Promise((resolve) => {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                }
                this.isRunning = false;
                resolve();
            });
        }

        async reset() {
            await this.stop();
            this.elapsedTime = 0;
            this.updateDisplay();
        }

        updateDisplay() {
            const totalSeconds = Math.floor(this.elapsedTime / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            const display = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            $('#timerDisplay').text(display);
        }

        getFormattedTime() {
            const totalSeconds = Math.floor(this.elapsedTime / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        getCurrentDuration() {
            return this.elapsedTime;
        }
    }

    class SessionManager {
        constructor() {
            this.sessions = this.loadSessions();
        }

        loadSessions() {
            try {
                const sessions = localStorage.getItem('stopwatchSessions');
                return sessions ? JSON.parse(sessions) : [];
            } catch (error) {
                console.error('Error loading sessions:', error);
                return [];
            }
        }

        saveSessions() {
            try {
                localStorage.setItem('stopwatchSessions', JSON.stringify(this.sessions));
            } catch (error) {
                console.error('Error saving sessions:', error);
            }
        }

        addSession(date, eventName, duration) {
            const session = {
                id: Date.now() + Math.random(),
                date: date,
                eventName: eventName,
                duration: duration,
                timestamp: new Date().toISOString(),
                durationMs: this.durationToMs(duration)
            };
            
            this.sessions.unshift(session);
            this.saveSessions();
            return session;
        }

        deleteSession(sessionId) {
            const initialLength = this.sessions.length;
            this.sessions = this.sessions.filter(session => session.id !== sessionId);
            
            if (this.sessions.length !== initialLength) {
                this.saveSessions();
                return true;
            }
            return false;
        }

        clearAllSessions() {
            const hadSessions = this.sessions.length > 0;
            this.sessions = [];
            this.saveSessions();
            return hadSessions;
        }

        durationToMs(duration) {
            const [hours, minutes, seconds] = duration.split(':').map(Number);
            return (hours * 3600 + minutes * 60 + seconds) * 1000;
        }

        getSessions(filterDate = null) {
            let sessions = this.sessions;
            
            if (filterDate) {
                sessions = sessions.filter(session => session.date === filterDate);
            }
            
            return sessions;
        }

        getStatistics() {
            const totalSessions = this.sessions.length;
            
            let totalMilliseconds = 0;
            this.sessions.forEach(session => {
                totalMilliseconds += session.durationMs;
            });
            
            const totalSeconds = Math.floor(totalMilliseconds / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            const totalTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            return {
                totalSessions,
                totalTime
            };
        }
    }

    // 初始化应用
    const stopwatch = new Stopwatch();
    const sessionManager = new SessionManager();

    // 删除相关变量
    let sessionToDelete = null;

    // 设置今天的日期作为默认值
    const today = new Date().toISOString().split('T')[0];
    $('#eventDate').val(today);

    // 验证函数
    const validateDate = (date) => {
        if (!date || date.trim() === '') {
            return 'Please select a date';
        }
        
        const selectedDate = new Date(date);
        if (isNaN(selectedDate.getTime())) {
            return 'Please select a valid date';
        }
        
        return '';
    };

    const validateEventName = (eventName) => {
        if (!eventName || eventName.trim() === '') {
            return 'Event name is required';
        }
        
        const trimmedName = eventName.trim();
        if (trimmedName.length < 3) {
            return 'Event name must be at least 3 characters';
        }
        if (trimmedName.length > 100) {
            return 'Event name too long (max 100 characters)';
        }
        
        const validChars = /^[a-zA-Z0-9\s\-'.,!?()]+$/;
        if (!validChars.test(trimmedName)) {
            return 'Event name contains invalid characters';
        }
        
        return '';
    };

    // 字段验证
    $('#eventDate').on('change blur', function() {
        const error = validateDate($(this).val());
        $('#dateError').text(error);
        updateButtonStates();
    });

    $('#eventName').on('input blur', function() {
        const error = validateEventName($(this).val());
        $('#eventNameError').text(error);
        updateButtonStates();
    });

    // 聚焦时清除错误
    $('#eventDate, #eventName').on('focus', function() {
        $(this).siblings('.error-message').text('');
    });

    // 更新按钮状态
    const updateButtonStates = () => {
        const dateValid = !validateDate($('#eventDate').val());
        const eventNameValid = !validateEventName($('#eventName').val());
        const formValid = dateValid && eventNameValid;
        const isRunning = stopwatch.isRunning;
        const hasSessions = sessionManager.sessions.length > 0;

        $('#startBtn').prop('disabled', !formValid || isRunning);
        $('#pauseResumeBtn').prop('disabled', !isRunning);
        $('#stopSaveBtn').prop('disabled', !isRunning);
        $('#resetBtn').prop('disabled', isRunning && stopwatch.elapsedTime === 0);
        $('#clearAllBtn').prop('disabled', !hasSessions);
        
        // 运行时禁用表单字段
        $('#eventDate, #eventName').prop('disabled', isRunning);
    };

    // 控制按钮处理程序
    $('#startBtn').on('click', async function() {
        const date = $('#eventDate').val();
        const eventName = $('#eventName').val();
        
        const dateError = validateDate(date);
        const eventNameError = validateEventName(eventName);
        
        if (dateError || eventNameError) {
            if (dateError) $('#dateError').text(dateError);
            if (eventNameError) $('#eventNameError').text(eventNameError);
            return;
        }
        
        try {
            await stopwatch.start();
            updateButtonStates();
            $('#pauseResumeBtn').text('Pause');
        } catch (error) {
            console.error('Error starting stopwatch:', error);
        }
    });

    $('#pauseResumeBtn').on('click', async function() {
        try {
            if (stopwatch.isRunning) {
                await stopwatch.pause();
                $(this).text('Resume');
            } else {
                await stopwatch.resume();
                $(this).text('Pause');
            }
        } catch (error) {
            console.error('Error pausing/resuming stopwatch:', error);
        }
    });

    $('#stopSaveBtn').on('click', async function() {
        try {
            await stopwatch.pause();
            
            const date = $('#eventDate').val();
            const eventName = $('#eventName').val();
            const duration = stopwatch.getFormattedTime();
            
            if (stopwatch.elapsedTime > 0) {
                sessionManager.addSession(date, eventName, duration);
                
                updateStatistics();
                displaySessions();
                
                $('#successModal').fadeIn();
            }
            
            await stopwatch.reset();
            updateButtonStates();
            $('#pauseResumeBtn').text('Pause').prop('disabled', true);
            
        } catch (error) {
            console.error('Error stopping and saving:', error);
        }
    });

    $('#resetBtn').on('click', async function() {
        try {
            await stopwatch.reset();
            updateButtonStates();
            $('#pauseResumeBtn').text('Pause').prop('disabled', true);
        } catch (error) {
            console.error('Error resetting stopwatch:', error);
        }
    });

    // 删除会话功能
    const setupDeleteHandlers = () => {
        $('.delete-session-btn').off('click').on('click', function() {
            const sessionId = $(this).data('session-id');
            const session = sessionManager.sessions.find(s => s.id === sessionId);
            
            if (session) {
                sessionToDelete = sessionId;
                $('#deleteModal').fadeIn();
            }
        });
    };

    // 确认删除
    $('#confirmDelete').on('click', function() {
        if (sessionToDelete) {
            const success = sessionManager.deleteSession(sessionToDelete);
            
            if (success) {
                updateStatistics();
                displaySessions($('#filterDate').val());
                updateButtonStates();
            }
            
            sessionToDelete = null;
            $('#deleteModal').fadeOut();
        }
    });

    // 取消删除
    $('#cancelDelete').on('click', function() {
        sessionToDelete = null;
        $('#deleteModal').fadeOut();
    });

    // 清空所有会话
    $('#clearAllBtn').on('click', function() {
        if (sessionManager.sessions.length > 0) {
            $('#clearAllModal').fadeIn();
        }
    });

    // 确认清空所有
    $('#confirmClearAll').on('click', function() {
        const hadSessions = sessionManager.clearAllSessions();
        
        if (hadSessions) {
            updateStatistics();
            displaySessions();
            updateButtonStates();
        }
        
        $('#clearAllModal').fadeOut();
    });

    // 取消清空所有
    $('#cancelClearAll').on('click', function() {
        $('#clearAllModal').fadeOut();
    });

    // 模态框处理
    $('#closeModal').on('click', function() {
        $('#successModal').fadeOut();
    });

    // 点击模态框外部关闭
    $(window).on('click', function(event) {
        if ($(event.target).is('.modal')) {
            $('.modal').fadeOut();
            sessionToDelete = null;
        }
    });

    // 过滤功能
    $('#filterDate').on('change', function() {
        displaySessions($(this).val());
    });

    $('#clearFilter').on('click', function() {
        $('#filterDate').val('');
        displaySessions();
    });

    // 显示会话
    const displaySessions = (filterDate = null) => {
        const sessions = sessionManager.getSessions(filterDate);
        const sessionHistory = $('#sessionHistory');
        
        if (sessions.length === 0) {
            const filterMessage = filterDate ? 
                'No sessions found for the selected date' : 
                'No sessions recorded yet';
            sessionHistory.html(`<div class="no-sessions">${filterMessage}</div>`);
            return;
        }
        
        let html = '';
        sessions.forEach(session => {
            const formattedDate = new Date(session.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            html += `
                <div class="session-item">
                    <div class="session-info">
                        <div class="session-date">${formattedDate}</div>
                        <div class="session-name">${session.eventName}</div>
                        <div class="session-duration">${session.duration}</div>
                    </div>
                    <div class="session-actions">
                        <button class="btn btn-danger btn-sm delete-session-btn" data-session-id="${session.id}">
                            Delete
                        </button>
                    </div>
                </div>
            `;
        });
        
        sessionHistory.html(html);
        setupDeleteHandlers();
    };

    // 更新统计信息
    const updateStatistics = () => {
        const stats = sessionManager.getStatistics();
        $('#totalSessions').text(stats.totalSessions);
        $('#totalTime').text(stats.totalTime);
    };

    // 初始显示
    updateStatistics();
    displaySessions();
    updateButtonStates();

    console.log('Stopwatch application initialized');
    console.log('Loaded sessions:', sessionManager.sessions.length);
});