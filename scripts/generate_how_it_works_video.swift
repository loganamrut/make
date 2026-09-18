import Foundation
import AppKit
import AVFoundation
import CoreGraphics

// MARK: - Constants & Video Config
let videoWidth = 1920
let videoHeight = 1080
let fps: Int32 = 30
let totalFrames = 750 // 25.0 seconds

let projectDir = "/Users/sachinmacmini/.gemini/antigravity/scratch/cvmake"
let outputVideoPath = "\(projectDir)/public/videos/how-it-works-ai-resume-builder.mp4"
let posterImagePath = "\(projectDir)/public/images/how-it-works-video-poster.jpg"

// MARK: - Color Palette
func rgb(_ r: CGFloat, _ g: CGFloat, _ b: CGFloat, _ a: CGFloat = 1.0) -> NSColor {
    return NSColor(red: r / 255.0, green: g / 255.0, blue: b / 255.0, alpha: a)
}

let cBgDark = rgb(9, 13, 22)
let cBgCard = rgb(17, 24, 39, 0.90)
let cBorderCard = rgb(55, 65, 81, 0.6)
let cIndigo = rgb(99, 102, 241)
let cIndigoDark = rgb(67, 56, 202)
let cEmerald = rgb(16, 185, 129)
let cEmeraldLight = rgb(110, 231, 183)
let cPurple = rgb(168, 85, 247)
let cAmber = rgb(245, 158, 11)
let cCyan = rgb(6, 182, 212)
let cWhite = rgb(255, 255, 255)
let cSlate100 = rgb(241, 245, 249)
let cSlate200 = rgb(226, 232, 240)
let cSlate300 = rgb(203, 213, 225)
let cSlate400 = rgb(148, 163, 184)
let cSlate500 = rgb(100, 116, 139)
let cSlate700 = rgb(51, 65, 85)
let cSlate800 = rgb(30, 41, 59)
let cSlate900 = rgb(15, 23, 42)

// MARK: - Asset Loader
func loadCGImage(at path: String) -> CGImage? {
    guard let nsImg = NSImage(contentsOfFile: path) else { return nil }
    var r = CGRect(origin: .zero, size: nsImg.size)
    return nsImg.cgImage(forProposedRect: &r, context: nil, hints: nil)
}

let imgIcon = loadCGImage(at: "\(projectDir)/public/icon-512.png")
let imgTemplates = loadCGImage(at: "\(projectDir)/public/images/video-assets/template-previews-fixed.png")
let imgEditor = loadCGImage(at: "\(projectDir)/public/images/video-assets/editor-preview-hybrid.png")
let imgInfographic = loadCGImage(at: "\(projectDir)/public/images/how-it-works-ai-resume-builder.jpg")

print("Assets loaded: icon=\(imgIcon != nil), templates=\(imgTemplates != nil), editor=\(imgEditor != nil), infographic=\(imgInfographic != nil)")

// MARK: - Coordinate Conversion Helper
func toCGY(_ y: CGFloat, h: CGFloat = CGFloat(videoHeight)) -> CGFloat {
    return h - y
}

// MARK: - Drawing Helpers
func drawGradient(ctx: CGContext, rect: CGRect, colors: [NSColor], locations: [CGFloat] = [0.0, 1.0]) {
    let cgRect = CGRect(x: rect.origin.x, y: toCGY(rect.origin.y + rect.size.height), width: rect.size.width, height: rect.size.height)
    let cgColors = colors.map { $0.cgColor } as CFArray
    guard let grad = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(), colors: cgColors, locations: locations) else { return }
    ctx.saveGState()
    ctx.clip(to: cgRect)
    ctx.drawLinearGradient(grad, start: CGPoint(x: cgRect.minX, y: cgRect.maxY), end: CGPoint(x: cgRect.maxX, y: cgRect.minY), options: [])
    ctx.restoreGState()
}

func drawRoundedRect(ctx: CGContext, rect: CGRect, radius: CGFloat, fill: NSColor? = nil, stroke: NSColor? = nil, lineWidth: CGFloat = 1.0) {
    let cgRect = CGRect(x: rect.origin.x, y: toCGY(rect.origin.y + rect.size.height), width: rect.size.width, height: rect.size.height)
    let path = CGPath(roundedRect: cgRect, cornerWidth: radius, cornerHeight: radius, transform: nil)
    ctx.addPath(path)
    if let f = fill {
        ctx.setFillColor(f.cgColor)
        ctx.fillPath()
    }
    if let s = stroke {
        ctx.addPath(path)
        ctx.setStrokeColor(s.cgColor)
        ctx.setLineWidth(lineWidth)
        ctx.strokePath()
    }
}

func drawText(text: String, x: CGFloat, y: CGFloat, size: CGFloat, weight: NSFont.Weight = .regular, color: NSColor, align: NSTextAlignment = .left, maxWidth: CGFloat? = nil) {
    let font = NSFont.systemFont(ofSize: size, weight: weight)
    let paragraphStyle = NSMutableParagraphStyle()
    paragraphStyle.alignment = align
    let attrs: [NSAttributedString.Key: Any] = [
        .font: font,
        .foregroundColor: color,
        .paragraphStyle: paragraphStyle
    ]
    let str = text as NSString
    let cgY = toCGY(y + size)
    let drawRect = CGRect(x: x, y: cgY, width: maxWidth ?? 1600, height: size * 1.5)
    str.draw(in: drawRect, withAttributes: attrs)
}

func drawBadge(ctx: CGContext, text: String, x: CGFloat, y: CGFloat, bg: NSColor, fg: NSColor, border: NSColor? = nil, iconDot: NSColor? = nil, size: CGFloat = 13) {
    let font = NSFont.systemFont(ofSize: size, weight: .semibold)
    let str = text as NSString
    let textWidth = str.size(withAttributes: [.font: font]).width
    let dotOffset: CGFloat = iconDot != nil ? 14 : 0
    let badgeW = textWidth + 24 + dotOffset
    let badgeH: CGFloat = size + 14
    
    drawRoundedRect(ctx: ctx, rect: CGRect(x: x, y: y, width: badgeW, height: badgeH), radius: badgeH / 2, fill: bg, stroke: border, lineWidth: 1)
    
    if let dot = iconDot {
        let dotCenterY = y + badgeH / 2
        drawRoundedRect(ctx: ctx, rect: CGRect(x: x + 10, y: dotCenterY - 4, width: 8, height: 8), radius: 4, fill: dot)
    }
    
    drawText(text: text, x: x + 12 + dotOffset, y: y + 5, size: size, weight: .semibold, color: fg, maxWidth: textWidth + 10)
}

func drawImage(ctx: CGContext, image: CGImage, rect: CGRect, radius: CGFloat = 0) {
    let cgRect = CGRect(x: rect.origin.x, y: toCGY(rect.origin.y + rect.size.height), width: rect.size.width, height: rect.size.height)
    ctx.saveGState()
    if radius > 0 {
        let clipPath = CGPath(roundedRect: cgRect, cornerWidth: radius, cornerHeight: radius, transform: nil)
        ctx.addPath(clipPath)
        ctx.clip()
    }
    ctx.draw(image, in: cgRect)
    ctx.restoreGState()
}

func drawCircularProgress(ctx: CGContext, center: CGPoint, radius: CGFloat, progress: CGFloat, trackColor: NSColor, barColor: NSColor, lineWidth: CGFloat = 12) {
    let cgCenter = CGPoint(x: center.x, y: toCGY(center.y))
    
    // Background track
    ctx.setLineWidth(lineWidth)
    ctx.setLineCap(.round)
    ctx.setStrokeColor(trackColor.cgColor)
    ctx.addArc(center: cgCenter, radius: radius, startAngle: 0, endAngle: CGFloat.pi * 2, clockwise: false)
    ctx.strokePath()
    
    // Filled progress
    if progress > 0 {
        let start = CGFloat.pi * 0.5 // Top
        let end = start - (progress * CGFloat.pi * 2)
        ctx.setStrokeColor(barColor.cgColor)
        ctx.addArc(center: cgCenter, radius: radius, startAngle: start, endAngle: end, clockwise: true)
        ctx.strokePath()
    }
}

// MARK: - Header Bar Renderer
func drawGlobalHeader(ctx: CGContext, frame: Int, activeStep: Int) {
    let headerY: CGFloat = 30
    let headerH: CGFloat = 64
    
    // Glassmorphic header bar
    drawRoundedRect(
        ctx: ctx,
        rect: CGRect(x: 40, y: headerY, width: CGFloat(videoWidth - 80), height: headerH),
        radius: 18,
        fill: rgb(15, 23, 42, 0.85),
        stroke: rgb(51, 65, 85, 0.8),
        lineWidth: 1.5
    )
    
    // Brand Logo & Text
    if let icon = imgIcon {
        drawImage(ctx: ctx, image: icon, rect: CGRect(x: 60, y: headerY + 12, width: 40, height: 40), radius: 10)
    }
    drawText(text: "CVMake", x: 112, y: headerY + 14, size: 22, weight: .black, color: cWhite)
    drawText(text: "AI Resume Studio", x: 215, y: headerY + 18, size: 14, weight: .bold, color: cIndigo)
    
    // 4 Step Pills in Header
    let steps = [
        (1, "01 Upload & OCR", cIndigo),
        (2, "02 AI Polish & ATS", cEmerald),
        (3, "03 17 ATS Templates", cPurple),
        (4, "04 Vector PDF Export", cAmber)
    ]
    
    var pillX: CGFloat = 430
    for (num, title, color) in steps {
        let isActive = (num == activeStep)
        let bg = isActive ? color.withAlphaComponent(0.25) : rgb(30, 41, 59, 0.5)
        let border = isActive ? color : rgb(51, 65, 85, 0.5)
        let fg = isActive ? cWhite : cSlate400
        let dot = isActive ? color : nil
        
        drawBadge(ctx: ctx, text: title, x: pillX, y: headerY + 14, bg: bg, fg: fg, border: border, iconDot: dot, size: 13)
        pillX += 230
    }
    
    // Right Privacy Badge
    drawBadge(
        ctx: ctx,
        text: "100% In-Browser Privacy",
        x: CGFloat(videoWidth - 320),
        y: headerY + 16,
        bg: rgb(6, 78, 59, 0.4),
        fg: cEmeraldLight,
        border: rgb(16, 185, 129, 0.5),
        iconDot: cEmerald,
        size: 13
    )
}

// MARK: - Bottom Timeline Bar Renderer
func drawBottomProgressBar(ctx: CGContext, frame: Int, totalFrames: Int) {
    let progress = min(1.0, max(0.0, CGFloat(frame) / CGFloat(totalFrames)))
    let barY: CGFloat = CGFloat(videoHeight - 20)
    
    // Background track
    drawRoundedRect(ctx: ctx, rect: CGRect(x: 0, y: barY, width: CGFloat(videoWidth), height: 6), radius: 3, fill: rgb(30, 41, 59, 0.8))
    
    // Progress fill with vibrant indigo/emerald gradient
    let fillWidth = CGFloat(videoWidth) * progress
    drawRoundedRect(ctx: ctx, rect: CGRect(x: 0, y: barY, width: fillWidth, height: 6), radius: 3, fill: cIndigo)
    
    // Bottom status text
    let currentSec = Double(frame) / Double(fps)
    let totalSec = Double(totalFrames) / Double(fps)
    let timeStr = String(format: "%02d:%02d / %02d:%02d", Int(currentSec) / 60, Int(currentSec) % 60, Int(totalSec) / 60, Int(totalSec) % 60)
    drawText(text: timeStr, x: 40, y: barY - 24, size: 13, weight: .semibold, color: cSlate400)
    
    let stepName: String
    if frame < 96 {
        stepName = "Workflow Overview: 4 Simple Steps to Your Interview-Ready Resume"
    } else if frame < 246 {
        stepName = "Step 1: Document Upload & Neural LSTM OCR Ingestion (PDF, DOCX, Scans)"
    } else if frame < 414 {
        stepName = "Step 2: Gemini AI Bullet Point Optimization & Live 0-100 ATS Score Audit"
    } else if frame < 576 {
        stepName = "Step 3: 17 Recruiter-Approved ATS Templates with Real-Time Styling"
    } else {
        stepName = "Step 4: 1-Click Vector PDF & Print Export with 100% In-Browser Privacy"
    }
    drawText(text: stepName, x: CGFloat(videoWidth - 750), y: barY - 24, size: 13, weight: .semibold, color: cSlate300, align: .right, maxWidth: 710)
}

// MARK: - Scene 1: Introduction (0.0s - 3.2s | Frames 0 - 96)
func drawScene1(ctx: CGContext, frame: Int) {
    // Center Title & Hero
    drawBadge(
        ctx: ctx,
        text: "OFFICIAL STEP-BY-STEP WALKTHROUGH",
        x: CGFloat(videoWidth / 2 - 170),
        y: 130,
        bg: rgb(99, 102, 241, 0.2),
        fg: cIndigo,
        border: rgb(99, 102, 241, 0.4),
        iconDot: cIndigo,
        size: 14
    )
    
    drawText(text: "How CVMake Works", x: 0, y: 175, size: 54, weight: .black, color: cWhite, align: .center, maxWidth: CGFloat(videoWidth))
    drawText(text: "The 100% Private Browser-Based AI Resume Builder & AI CV Maker", x: 0, y: 245, size: 24, weight: .medium, color: cSlate300, align: .center, maxWidth: CGFloat(videoWidth))
    
    // 4 Key Pillars
    let pills = [
        ("1. Ingest Documents", cIndigo),
        ("2. AI Optimization", cEmerald),
        ("3. 17 ATS Templates", cPurple),
        ("4. Instant Vector PDF", cAmber)
    ]
    var px: CGFloat = 340
    for (t, c) in pills {
        drawBadge(ctx: ctx, text: t, x: px, y: 295, bg: rgb(30, 41, 59, 0.7), fg: cWhite, border: c.withAlphaComponent(0.6), iconDot: c, size: 14)
        px += 310
    }
    
    // Central Infographic Preview
    if let img = imgInfographic {
        let cardW: CGFloat = 1100
        let cardH: CGFloat = cardW * (768.0 / 1376.0)
        let cardX: CGFloat = CGFloat(videoWidth / 2) - cardW / 2
        let cardY: CGFloat = 360
        
        drawRoundedRect(
            ctx: ctx,
            rect: CGRect(x: cardX - 8, y: cardY - 8, width: cardW + 16, height: cardH + 16),
            radius: 20,
            fill: rgb(15, 23, 42, 0.95),
            stroke: cIndigo.withAlphaComponent(0.5),
            lineWidth: 2
        )
        drawImage(ctx: ctx, image: img, rect: CGRect(x: cardX, y: cardY, width: cardW, height: cardH), radius: 14)
    }
}

// MARK: - Scene 2: Step 1 – Upload & Neural OCR (3.2s - 8.2s | Frames 96 - 246)
func drawScene2(ctx: CGContext, frame: Int) {
    let localFrame = frame - 96
    
    // Step Title Header
    drawBadge(
        ctx: ctx,
        text: "STEP 01",
        x: 100,
        y: 125,
        bg: rgb(99, 102, 241, 0.2),
        fg: cIndigo,
        border: rgb(99, 102, 241, 0.5),
        iconDot: cIndigo,
        size: 13
    )
    drawText(text: "Upload Any Document or Start Fresh", x: 190, y: 122, size: 36, weight: .black, color: cWhite)
    drawText(text: "Ingest PDF, Word DOCX, or smartphone camera scans with Neural LSTM OCR (4.0.0_best)", x: 100, y: 175, size: 18, weight: .regular, color: cSlate300)
    
    // Left: Document Paper Mockup with Animated Laser Scanner
    let docX: CGFloat = 100
    let docY: CGFloat = 225
    let docW: CGFloat = 520
    let docH: CGFloat = 760
    
    // Paper Sheet
    drawRoundedRect(ctx: ctx, rect: CGRect(x: docX, y: docY, width: docW, height: docH), radius: 16, fill: rgb(255, 255, 255, 0.96), stroke: rgb(226, 232, 240), lineWidth: 2)
    
    // Paper header
    drawRoundedRect(ctx: ctx, rect: CGRect(x: docX + 30, y: docY + 30, width: 220, height: 18), radius: 4, fill: rgb(30, 41, 59))
    drawRoundedRect(ctx: ctx, rect: CGRect(x: docX + 30, y: docY + 60, width: 340, height: 10), radius: 3, fill: rgb(100, 116, 139))
    drawRoundedRect(ctx: ctx, rect: CGRect(x: docX + 30, y: docY + 80, width: docW - 60, height: 2), radius: 1, fill: rgb(226, 232, 240))
    
    // Paper paragraphs & bullet lines
    var lineY: CGFloat = docY + 110
    for _ in 0..<3 {
        drawRoundedRect(ctx: ctx, rect: CGRect(x: docX + 30, y: lineY, width: 140, height: 14), radius: 3, fill: rgb(79, 70, 229, 0.8))
        lineY += 26
        for _ in 0..<4 {
            drawRoundedRect(ctx: ctx, rect: CGRect(x: docX + 45, y: lineY, width: CGFloat(docW - 90), height: 8), radius: 2, fill: rgb(203, 213, 225))
            lineY += 18
        }
        lineY += 24
    }
    
    // Animated Laser Beam moving up and down
    let scanCycle = sin(Double(localFrame) * 0.08) * 0.5 + 0.5 // 0.0 to 1.0
    let laserY = docY + 40 + CGFloat(scanCycle) * (docH - 100)
    
    // Laser glow aura
    drawGradient(
        ctx: ctx,
        rect: CGRect(x: docX + 10, y: laserY - 18, width: docW - 20, height: 36),
        colors: [rgb(6, 182, 212, 0.0), rgb(6, 182, 212, 0.45), rgb(6, 182, 212, 0.0)],
        locations: [0.0, 0.5, 1.0]
    )
    // Laser beam core line
    drawRoundedRect(ctx: ctx, rect: CGRect(x: docX + 10, y: laserY - 2, width: docW - 20, height: 4), radius: 2, fill: rgb(6, 182, 212))
    
    // Floating scan pill attached to laser
    drawBadge(ctx: ctx, text: "Neural OCR Reading...", x: docX + docW - 210, y: laserY - 28, bg: rgb(15, 23, 42, 0.9), fg: cCyan, border: cCyan, iconDot: cCyan, size: 11)
    
    // Right: Staggered Extracted Data Cards
    let rightX: CGFloat = 660
    let rightW: CGFloat = CGFloat(videoWidth) - rightX - 100
    
    // Card 1: Candidate Profile (appears immediately)
    drawRoundedRect(ctx: ctx, rect: CGRect(x: rightX, y: docY, width: rightW, height: 160), radius: 16, fill: cBgCard, stroke: cBorderCard, lineWidth: 1.5)
    drawBadge(ctx: ctx, text: "PARSED IDENTITY & CONTACT", x: rightX + 24, y: docY + 20, bg: rgb(99, 102, 241, 0.2), fg: cIndigo, border: cIndigo.withAlphaComponent(0.4), iconDot: cIndigo, size: 12)
    drawText(text: "Alex Rivera", x: rightX + 24, y: docY + 54, size: 28, weight: .bold, color: cWhite)
    drawText(text: "Senior Full-Stack Engineer • San Francisco, CA • alex.rivera@example.com", x: rightX + 24, y: docY + 95, size: 16, weight: .medium, color: cSlate300)
    drawText(text: "✔ GitHub: github.com/alexrivera • LinkedIn: linkedin.com/in/alexrivera", x: rightX + 24, y: docY + 124, size: 14, weight: .regular, color: cEmeraldLight)
    
    // Card 2: Extracted Skills (Frame 125+)
    if localFrame > 20 {
        let c2Y = docY + 185
        drawRoundedRect(ctx: ctx, rect: CGRect(x: rightX, y: c2Y, width: rightW, height: 170), radius: 16, fill: cBgCard, stroke: cBorderCard, lineWidth: 1.5)
        drawBadge(ctx: ctx, text: "SKILLS TAXONOMY DETECTED", x: rightX + 24, y: c2Y + 20, bg: rgb(16, 185, 129, 0.2), fg: cEmerald, border: cEmerald.withAlphaComponent(0.4), iconDot: cEmerald, size: 12)
        drawText(text: "18 Technical & Leadership Skills Found", x: rightX + 24, y: c2Y + 52, size: 22, weight: .bold, color: cWhite)
        
        let skills = ["React", "Next.js", "TypeScript", "Node.js", "Python", "Tailwind CSS", "PostgreSQL", "AWS Cloud", "GraphQL", "Docker"]
        var sx: CGFloat = rightX + 24
        var sy: CGFloat = c2Y + 90
        for s in skills {
            drawBadge(ctx: ctx, text: s, x: sx, y: sy, bg: rgb(30, 41, 59, 0.8), fg: cSlate100, border: rgb(71, 85, 105), size: 12)
            sx += CGFloat(s.count * 9 + 32)
            if sx > rightX + rightW - 130 {
                sx = rightX + 24
                sy += 34
            }
        }
    }
    
    // Card 3: Neural OCR Fidelity Metrics (Frame 150+)
    if localFrame > 45 {
        let c3Y = docY + 380
        drawRoundedRect(ctx: ctx, rect: CGRect(x: rightX, y: c3Y, width: rightW, height: 160), radius: 16, fill: cBgCard, stroke: cBorderCard, lineWidth: 1.5)
        drawBadge(ctx: ctx, text: "OCR ACCURACY & EXTRACTION FIDELITY", x: rightX + 24, y: c3Y + 20, bg: rgb(6, 182, 212, 0.2), fg: cCyan, border: cCyan.withAlphaComponent(0.4), iconDot: cCyan, size: 12)
        drawText(text: "100% Full Document Reading Complete", x: rightX + 24, y: c3Y + 52, size: 22, weight: .bold, color: cWhite)
        drawText(text: "• Dual-engine: pdfjs-dist vector decompression + Tesseract 4.0.0_best LSTM\n• Preserves exact work history dates, employers, metrics, and bullet structures", x: rightX + 24, y: c3Y + 92, size: 15, weight: .regular, color: cSlate300)
    }
    
    // Card 4: In-Browser Privacy Guarantee (Frame 175+)
    if localFrame > 70 {
        let c4Y = docY + 565
        drawRoundedRect(ctx: ctx, rect: CGRect(x: rightX, y: c4Y, width: rightW, height: 135), radius: 16, fill: rgb(6, 78, 59, 0.35), stroke: rgb(16, 185, 129, 0.6), lineWidth: 1.5)
        drawBadge(ctx: ctx, text: "ZERO CLOUD STORAGE GUARANTEE", x: rightX + 24, y: c4Y + 18, bg: rgb(6, 78, 59, 0.6), fg: cEmeraldLight, border: cEmerald, iconDot: cEmerald, size: 12)
        drawText(text: "100% In-Browser Execution", x: rightX + 24, y: c4Y + 48, size: 22, weight: .bold, color: cWhite)
        drawText(text: "Your resume files never touch an external database. All parsing is done locally in your browser session.", x: rightX + 24, y: c4Y + 84, size: 15, weight: .regular, color: cEmeraldLight)
    }
}

// MARK: - Scene 3: Step 2 – AI Optimization & Live ATS Score (8.2s - 13.8s | Frames 246 - 414)
func drawScene3(ctx: CGContext, frame: Int) {
    let localFrame = frame - 246
    
    // Step Title Header
    drawBadge(
        ctx: ctx,
        text: "STEP 02",
        x: 100,
        y: 125,
        bg: rgb(16, 185, 129, 0.2),
        fg: cEmerald,
        border: rgb(16, 185, 129, 0.5),
        iconDot: cEmerald,
        size: 13
    )
    drawText(text: "AI Optimization & Google XYZ Formula", x: 190, y: 122, size: 36, weight: .black, color: cWhite)
    drawText(text: "Transform weak passive job duties into quantifiable achievement bullets & live 0-100 ATS audit", x: 100, y: 175, size: 18, weight: .regular, color: cSlate300)
    
    // Top Row: Before vs After Comparison
    let colW: CGFloat = 830
    let colH: CGFloat = 340
    let colY: CGFloat = 225
    
    // Left: BEFORE Card
    drawRoundedRect(ctx: ctx, rect: CGRect(x: 100, y: colY, width: colW, height: colH), radius: 18, fill: rgb(24, 24, 27, 0.95), stroke: rgb(239, 68, 68, 0.5), lineWidth: 1.5)
    drawBadge(ctx: ctx, text: "BEFORE: RAW WEAK BULLET (ATS REJECTED)", x: 124, y: colY + 24, bg: rgb(127, 29, 29, 0.4), fg: rgb(252, 165, 165), border: rgb(239, 68, 68), iconDot: rgb(239, 68, 68), size: 12)
    drawText(text: "“Worked on web application frontend, managed team tasks, and fixed UI bugs across the product.”", x: 124, y: colY + 70, size: 22, weight: .medium, color: cSlate300, maxWidth: colW - 48)
    
    // Before critique tags
    drawBadge(ctx: ctx, text: "✘ Passive Voice", x: 124, y: colY + 160, bg: rgb(69, 10, 10), fg: rgb(252, 165, 165), size: 12)
    drawBadge(ctx: ctx, text: "✘ Zero Quantifiable Metrics", x: 270, y: colY + 160, bg: rgb(69, 10, 10), fg: rgb(252, 165, 165), size: 12)
    drawBadge(ctx: ctx, text: "✘ Missing High-Value ATS Keywords", x: 490, y: colY + 160, bg: rgb(69, 10, 10), fg: rgb(252, 165, 165), size: 12)
    
    drawText(text: "ATS Recruiter Impact: 58 / 100 (High Rejection Probability)", x: 124, y: colY + 280, size: 16, weight: .bold, color: rgb(248, 113, 113))
    
    // Right: AFTER Card
    let rightColX = CGFloat(videoWidth) - 100 - colW
    drawRoundedRect(ctx: ctx, rect: CGRect(x: rightColX, y: colY, width: colW, height: colH), radius: 18, fill: rgb(17, 24, 39, 0.95), stroke: cEmerald, lineWidth: 2)
    drawBadge(ctx: ctx, text: "AFTER: GEMINI AI REWRITE (GOOGLE XYZ FORMULA)", x: rightColX + 24, y: colY + 24, bg: rgb(6, 78, 59, 0.5), fg: cEmeraldLight, border: cEmerald, iconDot: cEmerald, size: 12)
    drawText(text: "“Spearheaded full-stack frontend refactor to Next.js 14, reducing TTFB by 42% and driving a 28% increase in mobile conversion across 1.2M monthly users.”", x: rightColX + 24, y: colY + 70, size: 22, weight: .bold, color: cWhite, maxWidth: colW - 48)
    
    // After feature tags
    drawBadge(ctx: ctx, text: "✔ Google XYZ Formula", x: rightColX + 24, y: colY + 160, bg: rgb(6, 78, 59), fg: cEmeraldLight, size: 12)
    drawBadge(ctx: ctx, text: "✔ Quantified Business Impact (42% TTFB, 28% Conv)", x: rightColX + 210, y: colY + 160, bg: rgb(6, 78, 59), fg: cEmeraldLight, size: 12)
    drawBadge(ctx: ctx, text: "✔ Strong Action Verb: Spearheaded", x: rightColX + 570, y: colY + 160, bg: rgb(6, 78, 59), fg: cEmeraldLight, size: 12)
    
    drawText(text: "ATS Recruiter Impact: 98 / 100 (Interview-Winning Tier)", x: rightColX + 24, y: colY + 280, size: 16, weight: .bold, color: cEmeraldLight)
    
    // Bottom Row: Live 0-100 ATS Score Audit Card
    let scoreCardY: CGFloat = 600
    let scoreCardH: CGFloat = 380
    drawRoundedRect(ctx: ctx, rect: CGRect(x: 100, y: scoreCardY, width: CGFloat(videoWidth - 200), height: scoreCardH), radius: 20, fill: cBgCard, stroke: cBorderCard, lineWidth: 1.5)
    
    // Animated Score Counter (interpolates from 62 to 98)
    let scoreAnimProgress = min(1.0, CGFloat(localFrame) / 70.0)
    let currentScore = Int(62.0 + scoreAnimProgress * 36.0)
    
    // Circular Gauge
    let gaugeCenter = CGPoint(x: 260, y: scoreCardY + 190)
    drawCircularProgress(
        ctx: ctx,
        center: gaugeCenter,
        radius: 95,
        progress: CGFloat(currentScore) / 100.0,
        trackColor: rgb(30, 41, 59),
        barColor: cEmerald,
        lineWidth: 18
    )
    
    drawText(text: "\(currentScore)", x: gaugeCenter.x - 55, y: scoreCardY + 155, size: 56, weight: .black, color: cWhite, align: .center, maxWidth: 110)
    drawText(text: "/ 100", x: gaugeCenter.x - 30, y: scoreCardY + 225, size: 18, weight: .bold, color: cSlate400, align: .center, maxWidth: 60)
    
    // Score Breakdown Cards on the right
    let metricX: CGFloat = 430
    drawBadge(ctx: ctx, text: "LIVE ATS AUDIT & RECRUITER READINESS", x: metricX, y: scoreCardY + 35, bg: rgb(16, 185, 129, 0.2), fg: cEmerald, border: cEmerald.withAlphaComponent(0.4), iconDot: cEmerald, size: 13)
    drawText(text: "ATS Compatibility Score: 98 / 100 (Excellent)", x: metricX, y: scoreCardY + 70, size: 30, weight: .black, color: cWhite)
    drawText(text: "Full diagnostic breakdown matching Taleo, Workday, Greenhouse & Lever algorithms:", x: metricX, y: scoreCardY + 120, size: 16, weight: .regular, color: cSlate300)
    
    // 3 Metric Progress Bars
    let metrics = [
        ("Action Verb Power", "100%", CGFloat(1.0)),
        ("Quantified Metric Density", "96%", CGFloat(0.96)),
        ("Parser Structural Cleanliness", "100%", CGFloat(1.0))
    ]
    var my: CGFloat = scoreCardY + 165
    for (mLabel, mVal, mFrac) in metrics {
        drawText(text: mLabel, x: metricX, y: my, size: 15, weight: .bold, color: cWhite)
        drawText(text: mVal, x: CGFloat(videoWidth - 280), y: my, size: 15, weight: .bold, color: cEmeraldLight, align: .right, maxWidth: 100)
        
        // Bar background
        drawRoundedRect(ctx: ctx, rect: CGRect(x: metricX, y: my + 24, width: CGFloat(videoWidth) - metricX - 160, height: 8), radius: 4, fill: rgb(30, 41, 59))
        // Bar fill
        let animatedW = (CGFloat(videoWidth) - metricX - 160) * mFrac * scoreAnimProgress
        drawRoundedRect(ctx: ctx, rect: CGRect(x: metricX, y: my + 24, width: animatedW, height: 8), radius: 4, fill: cEmerald)
        my += 54
    }
}

// MARK: - Scene 4: Step 3 – 17 ATS Pro Templates (13.8s - 19.2s | Frames 414 - 576)
func drawScene4(ctx: CGContext, frame: Int) {
    // Step Title Header
    drawBadge(
        ctx: ctx,
        text: "STEP 03",
        x: 100,
        y: 125,
        bg: rgb(168, 85, 247, 0.2),
        fg: cPurple,
        border: rgb(168, 85, 247, 0.5),
        iconDot: cPurple,
        size: 13
    )
    drawText(text: "Choose from 17 Recruiter-Approved Templates", x: 190, y: 122, size: 36, weight: .black, color: cWhite)
    drawText(text: "Switch layouts in real time with zero content loss. 100% single-column and structured hybrid options", x: 100, y: 175, size: 18, weight: .regular, color: cSlate300)
    
    // Visual Center: 4-Template Showcase Image
    if let tImg = imgTemplates {
        let cardW: CGFloat = 1180
        let cardH: CGFloat = cardW * (1000.0 / 1400.0)
        let cardX: CGFloat = 100
        let cardY: CGFloat = 225
        
        drawRoundedRect(
            ctx: ctx,
            rect: CGRect(x: cardX - 8, y: cardY - 8, width: cardW + 16, height: cardH + 16),
            radius: 20,
            fill: rgb(15, 23, 42, 0.95),
            stroke: cPurple.withAlphaComponent(0.6),
            lineWidth: 2
        )
        drawImage(ctx: ctx, image: tImg, rect: CGRect(x: cardX, y: cardY, width: cardW, height: cardH), radius: 14)
    }
    
    // Right: Interactive Template Controls Panel
    let rightX: CGFloat = 1320
    let rightW: CGFloat = CGFloat(videoWidth) - rightX - 100
    let rightY: CGFloat = 225
    let rightH: CGFloat = 760
    
    drawRoundedRect(ctx: ctx, rect: CGRect(x: rightX, y: rightY, width: rightW, height: rightH), radius: 20, fill: cBgCard, stroke: cBorderCard, lineWidth: 1.5)
    
    drawBadge(ctx: ctx, text: "TEMPLATE ENGINE", x: rightX + 24, y: rightY + 24, bg: rgb(168, 85, 247, 0.2), fg: cPurple, border: cPurple.withAlphaComponent(0.4), iconDot: cPurple, size: 12)
    drawText(text: "17 ATS Layouts", x: rightX + 24, y: rightY + 56, size: 26, weight: .black, color: cWhite)
    drawText(text: "Live preview updates instantly across every template:", x: rightX + 24, y: rightY + 98, size: 14, weight: .regular, color: cSlate300)
    
    // List of templates with active indicator
    let tList = [
        ("ATS Standard", "Single-column linear, 100% parser safe", true),
        ("Modern Accent", "Sleek colored divider & category tags", false),
        ("Two-Column Hybrid", "Executive sidebar with contact & skills", false),
        ("Career Timeline", "Milestone timeline rail with date pills", false),
        ("Metro Modular", "Card-based sections & tech stack chips", false),
        ("Vibrant Banner", "High-contrast full-bleed header block", false)
    ]
    
    var ty = rightY + 140
    for (tName, tDesc, isSel) in tList {
        let tBg = isSel ? rgb(168, 85, 247, 0.25) : rgb(30, 41, 59, 0.6)
        let tBorder = isSel ? cPurple : rgb(51, 65, 85, 0.6)
        
        drawRoundedRect(ctx: ctx, rect: CGRect(x: rightX + 20, y: ty, width: rightW - 40, height: 68), radius: 12, fill: tBg, stroke: tBorder, lineWidth: isSel ? 2 : 1)
        drawText(text: tName, x: rightX + 36, y: ty + 12, size: 16, weight: .bold, color: isSel ? cWhite : cSlate100)
        drawText(text: tDesc, x: rightX + 36, y: ty + 38, size: 12, weight: .regular, color: isSel ? rgb(216, 180, 254) : cSlate400)
        
        if isSel {
            drawBadge(ctx: ctx, text: "Active", x: rightX + rightW - 110, y: ty + 20, bg: cPurple, fg: cWhite, size: 11)
        }
        ty += 78
    }
    
    // Bottom Customizer Controls
    drawRoundedRect(ctx: ctx, rect: CGRect(x: rightX + 20, y: rightY + rightH - 120, width: rightW - 40, height: 95), radius: 12, fill: rgb(15, 23, 42, 0.8), stroke: rgb(51, 65, 85), lineWidth: 1)
    drawText(text: "Live Styling Adjustments", x: rightX + 36, y: rightY + rightH - 108, size: 14, weight: .bold, color: cWhite)
    drawBadge(ctx: ctx, text: "Theme: Indigo", x: rightX + 36, y: rightY + rightH - 74, bg: rgb(79, 70, 229, 0.3), fg: cIndigo, size: 11)
    drawBadge(ctx: ctx, text: "Font: Inter", x: rightX + 160, y: rightY + rightH - 74, bg: rgb(30, 41, 59), fg: cSlate200, size: 11)
    drawBadge(ctx: ctx, text: "Margin: 0.5 in", x: rightX + 265, y: rightY + rightH - 74, bg: rgb(30, 41, 59), fg: cSlate200, size: 11)
}

// MARK: - Scene 5: Step 4 – Vector PDF & Export (19.2s - 23.5s | Frames 576 - 705)
func drawScene5(ctx: CGContext, frame: Int) {
    let localFrame = frame - 576
    
    // Step Title Header
    drawBadge(
        ctx: ctx,
        text: "STEP 04",
        x: 100,
        y: 125,
        bg: rgb(245, 158, 11, 0.2),
        fg: cAmber,
        border: rgb(245, 158, 11, 0.5),
        iconDot: cAmber,
        size: 13
    )
    drawText(text: "1-Click Vector PDF & Native Print Export", x: 190, y: 122, size: 36, weight: .black, color: cWhite)
    drawText(text: "Instant vector PDF export with 100% design match, selectable text, and zero cloud database storage", x: 100, y: 175, size: 18, weight: .regular, color: cSlate300)
    
    // Visual Center: Editor & Live Preview Screenshot
    if let edImg = imgEditor {
        let cardW: CGFloat = 1100
        let cardH: CGFloat = cardW * (1000.0 / 1400.0)
        let cardX: CGFloat = 100
        let cardY: CGFloat = 225
        
        drawRoundedRect(
            ctx: ctx,
            rect: CGRect(x: cardX - 8, y: cardY - 8, width: cardW + 16, height: cardH + 16),
            radius: 20,
            fill: rgb(15, 23, 42, 0.95),
            stroke: cAmber.withAlphaComponent(0.6),
            lineWidth: 2
        )
        drawImage(ctx: ctx, image: edImg, rect: CGRect(x: cardX, y: cardY, width: cardW, height: cardH), radius: 14)
    }
    
    // Right Side: Download & Privacy Guarantees
    let rightX: CGFloat = 1240
    let rightW: CGFloat = CGFloat(videoWidth) - rightX - 100
    let rightY: CGFloat = 225
    let rightH: CGFloat = 760
    
    drawRoundedRect(ctx: ctx, rect: CGRect(x: rightX, y: rightY, width: rightW, height: rightH), radius: 20, fill: cBgCard, stroke: cBorderCard, lineWidth: 1.5)
    
    drawBadge(ctx: ctx, text: "EXPORT CENTER", x: rightX + 24, y: rightY + 24, bg: rgb(245, 158, 11, 0.2), fg: cAmber, border: cAmber.withAlphaComponent(0.4), iconDot: cAmber, size: 12)
    drawText(text: "Download Options", x: rightX + 24, y: rightY + 56, size: 28, weight: .black, color: cWhite)
    
    // Animated Pulsing Download Button
    let pulseScale = 1.0 + 0.02 * sin(Double(localFrame) * 0.15)
    let btnW = (rightW - 48) * CGFloat(pulseScale)
    let btnH: CGFloat = 64
    let btnX = rightX + 24 - (btnW - (rightW - 48)) / 2
    let btnY = rightY + 115
    
    drawRoundedRect(ctx: ctx, rect: CGRect(x: btnX, y: btnY, width: btnW, height: btnH), radius: 14, fill: cIndigo)
    drawText(text: "⬇ Download Vector PDF (Free)", x: btnX, y: btnY + 18, size: 20, weight: .bold, color: cWhite, align: .center, maxWidth: btnW)
    
    // Secondary Print Button
    let btn2Y = btnY + 80
    drawRoundedRect(ctx: ctx, rect: CGRect(x: rightX + 24, y: btn2Y, width: rightW - 48, height: 50), radius: 12, fill: rgb(30, 41, 59), stroke: rgb(71, 85, 105), lineWidth: 1)
    drawText(text: "🖨 Native Browser Print (Ctrl+P / Cmd+P)", x: rightX + 24, y: btn2Y + 14, size: 16, weight: .bold, color: cSlate100, align: .center, maxWidth: rightW - 48)
    
    // 4 Crucial Guarantees
    let guarantees = [
        ("✔ 100% Vector Text Layer", "Selectable, searchable, and guaranteed to parse in Taleo, Workday, Greenhouse & Lever."),
        ("✔ Zero Cloud Database Storage", "Private by design. Your resume content never leaves your browser session."),
        ("✔ Unwatermarked & Full Quality", "No paywalls, no forced trial subscriptions, no hidden watermark fees."),
        ("✔ JSON Backup & Plain Text", "Export raw structured JSON to restore your work anytime on any computer.")
    ]
    
    var gy = btn2Y + 85
    for (gTitle, gDesc) in guarantees {
        drawText(text: gTitle, x: rightX + 24, y: gy, size: 16, weight: .bold, color: cEmeraldLight)
        drawText(text: gDesc, x: rightX + 24, y: gy + 26, size: 13, weight: .regular, color: cSlate300, maxWidth: rightW - 48)
        gy += 82
    }
}

// MARK: - Scene 6: Outro (23.5s - 25.0s | Frames 705 - 750)
func drawScene6(ctx: CGContext, frame: Int) {
    // Clean, high-impact CTA screen
    let ctaW: CGFloat = 800
    let ctaH: CGFloat = 460
    let ctaX: CGFloat = CGFloat(videoWidth / 2) - ctaW / 2
    let ctaY: CGFloat = 300
    
    drawRoundedRect(
        ctx: ctx,
        rect: CGRect(x: ctaX, y: ctaY, width: ctaW, height: ctaH),
        radius: 28,
        fill: rgb(15, 23, 42, 0.95),
        stroke: cIndigo,
        lineWidth: 2
    )
    
    if let icon = imgIcon {
        drawImage(ctx: ctx, image: icon, rect: CGRect(x: CGFloat(videoWidth / 2 - 40), y: ctaY + 40, width: 80, height: 80), radius: 20)
    }
    
    drawText(text: "CVMake", x: 0, y: ctaY + 140, size: 44, weight: .black, color: cWhite, align: .center, maxWidth: CGFloat(videoWidth))
    drawText(text: "Build Your ATS-Optimized Resume in 5 Minutes", x: 0, y: ctaY + 200, size: 22, weight: .bold, color: cSlate200, align: .center, maxWidth: CGFloat(videoWidth))
    drawText(text: "100% In-Browser Privacy • 17 Recruiter Templates • Instant Vector PDF", x: 0, y: ctaY + 240, size: 16, weight: .medium, color: cIndigo, align: .center, maxWidth: CGFloat(videoWidth))
    
    // Giant CTA Button
    let btnW: CGFloat = 440
    let btnH: CGFloat = 64
    let btnX = CGFloat(videoWidth / 2) - btnW / 2
    let btnY = ctaY + 295
    drawRoundedRect(ctx: ctx, rect: CGRect(x: btnX, y: btnY, width: btnW, height: btnH), radius: 18, fill: cIndigo)
    drawText(text: "Launch AI Studio at cvmake.dev →", x: btnX, y: btnY + 18, size: 20, weight: .bold, color: cWhite, align: .center, maxWidth: btnW)
    
    drawText(text: "Free Forever • No Credit Card • No Sign Up Required", x: 0, y: ctaY + 390, size: 14, weight: .medium, color: cSlate400, align: .center, maxWidth: CGFloat(videoWidth))
}

// MARK: - Main Video Generation Pipeline
print("Starting hardware-accelerated video synthesis...")
let outputURL = URL(fileURLWithPath: outputVideoPath)
try? FileManager.default.removeItem(at: outputURL)

guard let writer = try? AVAssetWriter(outputURL: outputURL, fileType: .mp4) else {
    print("Error: Failed to instantiate AVAssetWriter")
    exit(1)
}

let videoSettings: [String: Any] = [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: videoWidth,
    AVVideoHeightKey: videoHeight,
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: 2_600_000,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel
    ]
]

let writerInput = AVAssetWriterInput(mediaType: .video, outputSettings: videoSettings)
let pixelBufferAdaptor = AVAssetWriterInputPixelBufferAdaptor(
    assetWriterInput: writerInput,
    sourcePixelBufferAttributes: [
        kCVPixelBufferPixelFormatTypeKey as String: Int(kCVPixelFormatType_32ARGB),
        kCVPixelBufferWidthKey as String: videoWidth,
        kCVPixelBufferHeightKey as String: videoHeight
    ]
)

writer.add(writerInput)
writer.startWriting()
writer.startSession(atSourceTime: .zero)

let colorSpace = CGColorSpaceCreateDeviceRGB()
let startTime = Date()

for frame in 0..<totalFrames {
    while !writerInput.isReadyForMoreMediaData {
        usleep(1000)
    }
    
    var pixelBuffer: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(nil, pixelBufferAdaptor.pixelBufferPool!, &pixelBuffer)
    guard let pb = pixelBuffer else { continue }
    
    CVPixelBufferLockBaseAddress(pb, [])
    guard let ctx = CGContext(
        data: CVPixelBufferGetBaseAddress(pb),
        width: videoWidth,
        height: videoHeight,
        bitsPerComponent: 8,
        bytesPerRow: CVPixelBufferGetBytesPerRow(pb),
        space: colorSpace,
        bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue
    ) else {
        CVPixelBufferUnlockBaseAddress(pb, [])
        continue
    }
    
    // 1. Fill deep background gradient
    let bgColors = [
        rgb(9, 13, 22).cgColor,
        rgb(15, 23, 42).cgColor,
        rgb(30, 27, 75).cgColor
    ] as CFArray
    let bgGrad = CGGradient(colorsSpace: colorSpace, colors: bgColors, locations: [0.0, 0.6, 1.0])!
    ctx.drawLinearGradient(bgGrad, start: CGPoint(x: 0, y: 0), end: CGPoint(x: CGFloat(videoWidth), y: CGFloat(videoHeight)), options: [])
    
    // 2. Setup AppKit text context
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(cgContext: ctx, flipped: false)
    
    // 3. Determine Active Step & Render Scene
    let activeStep: Int
    if frame < 96 {
        activeStep = 0
        drawScene1(ctx: ctx, frame: frame)
    } else if frame < 246 {
        activeStep = 1
        drawScene2(ctx: ctx, frame: frame)
    } else if frame < 414 {
        activeStep = 2
        drawScene3(ctx: ctx, frame: frame)
    } else if frame < 576 {
        activeStep = 3
        drawScene4(ctx: ctx, frame: frame)
    } else if frame < 705 {
        activeStep = 4
        drawScene5(ctx: ctx, frame: frame)
    } else {
        activeStep = 4
        drawScene6(ctx: ctx, frame: frame)
    }
    
    // 4. Header Bar & Progress Tracker
    drawGlobalHeader(ctx: ctx, frame: frame, activeStep: activeStep)
    drawBottomProgressBar(ctx: ctx, frame: frame, totalFrames: totalFrames)
    
    // If frame == 100, save a high-res poster thumbnail
    if frame == 100 {
        if let cgPoster = ctx.makeImage() {
            let rep = NSBitmapImageRep(cgImage: cgPoster)
            if let jpgData = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.92]) {
                try? jpgData.write(to: URL(fileURLWithPath: posterImagePath))
                print("Saved poster image to \(posterImagePath)")
            }
        }
    }
    
    NSGraphicsContext.restoreGraphicsState()
    CVPixelBufferUnlockBaseAddress(pb, [])
    
    let presentTime = CMTime(value: Int64(frame), timescale: fps)
    pixelBufferAdaptor.append(pb, withPresentationTime: presentTime)
    
    if frame % 150 == 0 {
        print("Rendered frame \(frame)/\(totalFrames) (\(Int(Double(frame) / Double(totalFrames) * 100))%)...")
    }
}

writerInput.markAsFinished()
let sema = DispatchSemaphore(value: 0)
writer.finishWriting {
    sema.signal()
}
sema.wait()

let elapsed = Date().timeIntervalSince(startTime)
let fileSize = (try? FileManager.default.attributesOfItem(atPath: outputVideoPath)[.size] as? Int) ?? 0

print("✅ Video generated successfully in \(String(format: "%.2f", elapsed))s!")
print("📁 Output path: \(outputVideoPath)")
print("📊 File size: \(fileSize / 1024) KB (\(String(format: "%.2f", Double(fileSize) / 1024.0 / 1024.0)) MB)")
print("🎬 Duration: \(Double(totalFrames) / Double(fps)) seconds @ \(fps) fps (\(videoWidth)x\(videoHeight))")
